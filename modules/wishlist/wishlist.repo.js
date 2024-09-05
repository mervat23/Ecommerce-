let Wishlist = require("./wishlist.model");
const product = require("../product/product.repo")


exports.isExist= async (filter) => {
    try{
  let wishlist = await Wishlist.findOne(filter);
  if (wishlist) {
    return {
      code: 200,
      success: true,
      data: wishlist,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "wishlist is not found",
    };
  }
}
catch(error){
    console.log("error"+error.message)
    return{
     code:500,
     success:false,
     error:"unexpected error"
    }
   }
}; 


exports.list = async (filter) => {
  try{
  let wishlist = await Wishlist.find(filter)
  .populate({ path: "user", select: "Name image" })
  .populate({ path: "products.product", select: "name image" });
  if(wishlist){
  return {
    code: 200,
    success: true,
    data:wishlist,
  }
}else{
  return {
    code: 404,
    success: false,
    error: "wishlists not found",
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


exports.get= async (filter) => {
  try{
  if (filter.user) {
    let wishlist = await Wishlist.findOne(filter)
    .populate({ path: "user", select: "Name image" })
    .populate({ path: "products.product", select: "name image" });
    if(wishlist){
    return {
      code: 200,
      success: true,
     data:wishlist,
    };
  }
  else{
    wishlist= new Wishlist({user:filter.user});
    await wishlist.save();
    wishlist =await Wishlist.findOne(filter)
    .populate({ path: "user", select: "Name image" })
    .populate({ path: "products.product", select: "name image" });
    return {
      code: 201,
      success: true,
      data: wishlist,
    };
  }
  } else {
    return {
      code: 404,
      success: false,
      error: "user id is required",
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


exports.addProduct= async (userId,productId) => {
  try{
  let Product= await product.isExist({_id:productId});
  if (Product.success) {
    let wishlist = await this.get({user:userId});
    if (wishlist.success) {
      let isExist = await this.isItemInWishlist(wishlist.data.products, productId);
      if (isExist.success) {  
    return {
      code: 400,
      success: false,
      error: "product is already in the wishlist!"
    };
  }

  
  else {
    wishlist.data.products.push({_id:Product.data._id,product:Product.data ,
      store: Product.data.store});
    await Wishlist.findByIdAndUpdate(
      {_id:wishlist.data._id},
    {products:wishlist.data.products}
    );
    return {
      code: 201,
      success: true,
      data: wishlist.data
    }
}
}
} else {
    return {
      code: 404,
      success: false,
      error: "product is not found",
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


exports.removeItem= async (filter,product) => {
  try{
    let wishlist = await this.isExist(filter);
    if (wishlist.success) {
    let isExist = await this.isItemInWishlist(wishlist.data.products, product);
       if (isExist.success) {
        wishlist.data.products.splice(isExist.index, 1);
        await Wishlist.findByIdAndUpdate(
        { _id: wishlist.data._id },
        { products: wishlist.data.products }
          )
        return {
        success: true,
        data: wishlist.data,
        code: 200
        }
      }
      else {
      return {
     code: 404,
      success: false,
      error: "product not found in wishlist!"
      }
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


exports.isItemInWishlist = async (arrayOfProducts, productId) => {
  try {
      let i = -1
      const result = await arrayOfProducts.find(element => {
          i++;
          if (element._id == productId) { return element }
      });

      if (result) {
          return {
              success: true,
              data: result,
              index: i,
              code: 200
          };
      }
      else {
          return {
              success: false,
              error: "product not found in wishlist",
              code: 404
          };
      }
  } catch (err) {
      console.log(`err.message`, err.message);
      return {
          success: false,
          code: 500,
          error: "Unexpected Error!"
      };
  }
}; 

