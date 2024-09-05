let User = require("./user.model");
const bcrypt=require("bcrypt")
let fs = require("fs")
const Cart = require("../cart/cart.model");
const Review = require("../review/review.model");
const Wishlist = require("../wishlist/wishlist.model");
const Order = require("../order/order.model");


exports.isExist = async (filter) => {
  try{
  let user = await User.findOne(filter);
  if (user) {
    return {
      code: 200,
      data: user,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "user is not found",
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
  let users = await User.find(filter).select("-Password");
  if (users) {
  return {
    code: 200,
    success: true,
    data:users,
  }
}
  else {
    return {
      code: 404,
      success: false,
      error: "Users not found",
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
    if (form.Email) form.Email = form.Email.toLowerCase()
  let user = await this.isExist({Email:form.Email});
  if (!user.success) {
    const newUser = new User(form);
    await newUser.save();
    return {
      code: 201,
      success: true,
      data: newUser,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "User already exists",
    };
  }
}catch(error){
  console.log("error"+error.message)
 return{
  code:500,
  success:false,
  error:"unexpected error!"
 }
}
}; 


exports.update = async (id, form) => {
  try{
    let user = await this.isExist({ _id: id});
  if (user.success) {
    let result= await User.findByIdAndUpdate(id, form);
    return {
      code: 201,
      success: true,
      data: result,
    };
  }
  else {
    return {
      code: 404,
      success: false,
      error: user.error,
    };
  }
} catch (err) {
  console.log(`err.message`, err.message);
  return {
    success: false,
    code: 500,
    error: "unexpected error!"
  };
}
}


exports.get = async (filter) => {
  try{
    let user = await User.findOne(filter).select("-Password");
    if(user){
    return {
      code: 200,
      success: true,
      user,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "User not found",
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
  const user = await this.isExist({ _id});
  if (user.success) {
    let oldImage = (user.success && user.data.image) ? (user.data.image) : false
    if (oldImage) {
      try {
        await fs.unlinkSync(oldImage.path);
      }
      catch (err) {
        console.log(`err`, err.errno);
      }
    }
    await User.findByIdAndDelete({_id})
    await Cart.deleteMany({ "user": _id })
    await Wishlist.deleteMany({ "user": _id })
    await Order.deleteMany({ "user": _id })
    await Review.deleteMany({ "user": _id })
  
    return {
      success: true,
      code: 200
    };
  }
  else {
    return {
      success: false,
      error: user.error,
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
} 


 exports.comparePassword=async(Email,Password)=>{
  try{
  Email=Email.toLowerCase()
 let user=await this.isExist({Email})
 if(user.success){
  let match=await bcrypt.compare(Password,user.data.Password)
  if(match){
    return{
    code:200,
    success:true,
    data:user.data,
    }
  }
  else{
    return{
      code:401,
      success:false,
      error:"incorrect password"
      } 
  }
}
  else return {
    code: 404,
    success: false,
    error: user.error,
  }
  }catch(error){
    console.log("error"+error.message)
    return{
    code:500,
     success:false,
     error:"unexpected error"
    }
  }
}


exports.resetPassword = async (Email, newPassword) => {
  try {
    Email = Email.toLowerCase()
    let user = await this.isExist({Email})
    let saltrouds = 5;
    if (user.success) {
      let hashedPassword = await bcrypt.hash(newPassword, saltrouds)
    let result=await User.findOneAndUpdate({Email}, {Password: hashedPassword })

      return {
        code: 200,
        success: true,
        data:result
      };
    } else return {
      code: 404,
      success: false,
      error: user.error,
    };
  } catch (err) {
    console.log(`err.message`, err.message);
    return {
      code: 500,
      success: false,
      error: "Unexpected Error!"
    };
  }
}

