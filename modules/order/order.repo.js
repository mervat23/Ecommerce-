const Order = require("./order.model");



exports.isExist = async (filter) => {
  try{
  let order = await Order.findOne(filter);
  if (order) {
    return {
      code: 200,
      success: true,
      data: order,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "order is not found",
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
  let orders = await Order.find(filter)
  .populate({ path: "user", select: "Name image" });
  if(orders){
  return {
    code: 200,
    success: true,
    data:orders,
  };
}else{
  return {
    code: 404,
    success: false,
    error: "orders not found",
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


exports.create = async(form) => {
  try{
  let order = await this.isExist({user:form.user});
  if (!order.success) {
    const newOrder = new Order(form);
    await newOrder.save();
    return {
      code: 201,
      success: true,
      data:newOrder,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Order already exists",
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

exports.update = async (id,form) => {
  try{
  let order = await this.isExist({_id:id});
  if (order.success) {
    let result=await Order.findByIdAndUpdate(id,form);
    return {
      code: 201,
      success: true,
      data: result,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "order not found",
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
 
    let order = await Order.findOne(filter)
    .populate({ path: "user", select: "Name image" });
    if(order){
    return {
      code: 200,
      success: true,
      data:order,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Order not found",
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


exports.cancelOrder = async (id) => {
  try{ 
  const order = await this.isExist({ _id: id });
  if (order.success) {
    let result=await Order.findByIdAndDelete(id);
    return {
      code: 200,
      success: true,
      data:result
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "order not found",
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



