let Cart = require("./cart.model");
let Product= require("../product/product.repo");


exports.isExist = async (filter) => {
  try{
  let cart = await Cart.findOne(filter);
  if (cart) {
    return {
      code: 200,
      success: true,
      data: cart,
    };
  } else {
    const cart = new Cart({ user:filter.user, total: 0})
    await cart.save();
    return {
      code: 201,
      success: true,
      data: cart,
  }
}
}catch(error){ 
  console.log("error"+error.message)
  return{
   code:500,
   success:false,
   error:"unexpected error"
  }
}
};  

exports.get = async(filter) => {
  try{
    if(filter.user){
    let cart = await Cart.findOne(filter)
    .populate({ path: "user", select: "Name image" });
    if(cart){
    return {
      code: 200,
      success: true,
      cart,
    };
  } else {
    const cart = new Cart({ user:filter.user, total: 0})
    await cart.save();
    return {
      code: 201,
      success: true,
      data: cart,
  }
}
    }
else {
  return {
    success: false,
    code: 404,
    error: "User ID is required!"
  };
}
}catch(error){
  console.log("error"+error.message)
  return{
   success:false,
   code:500,
   error:"unexpected error"
  }
}
}; 

exports.list = async(filter) => {
  try{
  let items = await Cart.find(filter)
  .populate({ path: "user", select: "Name image" });
  if(items){
  return {
    code: 200,
    success: true,
    data:items,
  };
}else{
  return {
    code: 404,
    success: false,
    error: "items not found",
  };
}
}catch(error){
  console.log("error"+error.message)
  return{
   code:500,
   success:false,
   error:"unexpected error"
  }
}
}; 

exports.update = async (filter, form) => {
  try {
    let cart = await this.isExist(filter);
    if (cart.success) {
      await Cart.findByIdAndUpdate({ _id: cart.data._id }, form)
      return {
        success: true,
        code: 201
      };
    }
    else {
      return {
        success: true,
        error: cart.error,
        code: 201
      };
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: "Unexpected Error!"
    };
  }
}


exports.addItemToCart=async(userId,productId,quantity)=>{
   try{
    let product = await Product.isExist({_id:productId});
    if(product.success){
      let price=parseFloat(product.data.price)
      const cart=await this.isExist({user:userId})
      const isItemExists=await this.isItemInCart(cart.data.products,productId)

      if(isItemExists.success){
       let newQuantity=parseInt(isItemExists.data.quantity)+parseInt(quantity)
       let itemTotal=price*newQuantity
       let foundItem=cart.data.products[isItemExists.index]
       foundItem.quantity=newQuantity
       foundItem.total=itemTotal
       let cartUpdate=await this.calculateTotalOfAllProductsInCart(cart.data)
       return{
        code:201,
        success:true,
        data:cartUpdate.data,
       }
      }
      else{   
      if((cart.data.products).length!=0&&(cart.data.store).toString()!=(product.data.store).toString()){
        return{
            code:409,
            success:false,
            error:"products from different store can not be added",
          }
        }
        cart.data.store=product.data.store
        cart.data.products.push({_id:productId,
          product:product.data,quantity,total:(price*quantity)})

        let cartUpdate=await this.calculateTotalOfAllProductsInCart(cart.data)
        return{
          code:201,
          success:true,
          data:cartUpdate.data,
        }
      }
    }
    else{
      return{
        code:404,
        success:false,
        error:product.error,
      } 
    }

   }catch(err){
    console.log("error"+err.message)
  return{
    code:500,
   success:false,
   error:"unexpected error"
  }
   }
} 

exports.isItemInCart=async(arrayOfItems,productId)=>{
  try{
    let i=-1
    const result=await arrayOfItems.find(element=>{
      i++
      if(element._id==productId){return element}
    })
    if(result){
      return{
        code:200,
        success:true,
        data:result,
        index:i,
      
      }
    }
    else{
      return{
        code: 404,
        success:false,
        error:"item not found in cart",

      }
    }

  }catch(err){
    console.log("error"+err.message)
  return{
   code:500,
   success:false,
   error:"unexpected error"
  }
}
 } 


exports.calculateTotalOfAllProductsInCart=async(cart)=>{
   try{
    let cartTotal=0
    await cart.products.forEach(item => {
    let price=parseFloat(item.product.price)
    price=price*item.quantity 
    cartTotal+=price
    });
    if((cart.products).length==0){
      await Cart.findOneAndUpdate({_id:cart._id},
      {
        products:[],total:0,
        $unset:{store:1}
      })
       delete cart.store
    }
    else{
      await Cart.findByIdAndUpdate({_id:cart._id},{products:cart.products,total:cartTotal,
        store:cart.store})
    }
    cart.total=cartTotal
    return{
      success:true,
      record:cart,
      code:200
    }
   }catch(err){
    console.log("error"+err.message)
    return{
     success:false,
     code:500,
     error:"unexpected error"
    }
   }
}  


exports.removeItem=async(userId,productId,quantity)=>{
  try{
  const cart=await this.isExist({user:userId})
  const isItemExists=await this.isItemInCart(cart.data.products,productId)
  if(isItemExists.success){
   let newQuantity=parseInt(isItemExists.data.quantity)-parseInt(quantity)
   let itemTotal=parseFloat(isItemExists.data.product.price)*newQuantity
   let foundItem=cart.data.products[isItemExists.index]
   foundItem.quantity=newQuantity
   foundItem.total=itemTotal
   if(newQuantity<=0){
    await cart.data.products.splice(isItemExists.index,1)
    cartUpdate=await this.calculateTotalOfAllProductsInCart(cart.data)
    console.log(cartUpdate)
    return{
      code:200,
      success:true,
      data:cartUpdate.data,
    } 
   }
   await cart.data.products.splice(isItemExists.index,1,foundItem)
    cartUpdate=await this.calculateTotalOfAllProductsInCart(cart.data)
    return{
      code:200,
      success:true,
      data:cartUpdate.data,
    } 
  }
  else{
    return{
      code:404,
      success:false,
      error:"item is not found in the cart",
    }
  }
  }catch(err){
    console.log("error"+err.message)
    return{
      code:500,
     success:false,
     error:"unexpected error"
    }
  }
} 


exports.flush=async(filter)=>{
  try{
   
  let cart= await Cart.findOneAndUpdate(filter,
    {
     products:[],total:0,
     $unset:{store:1}
    })
    if(cart){
    return{
      code:200,
      success:true
    }
    }
    else {
      return {
        code: 404,
        success: false,
        error: "cart not found",
      };
    }
  }catch(err){
  console.log(`err`,err)
  return{
    code:404,
    success:false,
    error:"unexpected error"
  }
  }
} 