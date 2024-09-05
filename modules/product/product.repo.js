const Product = require("./product.model");
const fs=require("fs")
const Cart = require("../cart/cart.model");
const Review = require("../review/review.model");
const Wishlist = require("../wishlist/wishlist.model");
const Orders = require("../order/order.model");

 
exports.isExist = async(filter) => {
  try{
  let product = await Product.findOne(filter);
  if (product) {
    return {
      code: 200,
      success: true,
      data: product,
    };
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

exports.list = async (filter) => {
  try{
  let products = await Product.find(filter)
  if(products){
  return {
    code: 200,
    success: true,
    products,
  };
}else{
  return {
    code: 404,
    success: false,
    error: "products not found",
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

exports.create = async (form) => {
  try{
  let product = await this.isExist({name:form.name});
  if (!product.success) {
    const newProduct = new Product(form);
    await newProduct.save();
    return {
      code: 201,
      success: true,
      data: newProduct,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Product already exists",
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

exports.update = async (_id, form) => {
  try{
  let product = await this.isExist({ _id});
  if (product.success) {
   await Product.findByIdAndUpdate({_id}, form);
   await Cart.deleteMany({ "products._id": _id })
   await Wishlist.deleteMany({ "products._id": _id })
   let productUpdate = await this.isExist({ _id });
    return {
      code: 201,
      success: true,
      data: productUpdate.data,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: product.error,
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

exports.get = async (filter) => {
  try{
    let product = await Product.findOne(filter);
    if(product){
    return {
      code: 200,
      success: true,
      product,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Product not found",
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

exports.remove = async (_id) => {
  try{
    const product = await this.isExist({ _id});
    if (product.success) {
      let oldImages = (product.success && product.data.image) ? (product.data.image) : false
      if (oldImages) {
        try {
          await oldImages.map((image) => {
            fs.unlinkSync(image.path);
          })
        }
        catch (err) {
          console.log(`err`, err.errno);
        }
      } 
      await Product.findByIdAndDelete({ _id })
      await Cart.deleteMany({ "products._id": _id })
      await Wishlist.deleteMany({ "products._id": _id })
      await Review.deleteMany({ "product": _id })
      await Orders.deleteMany({ "products._id": _id })

      return {
        success: true,
        code: 200
      };
    }
    else {
      return {
        code: 404,
        success: false,
        error: product.error,
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



