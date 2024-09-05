const Review = require("./review.model");



exports.isExist = async (filter) => {
  try{
  let review = await Review.findOne(filter);
  if (review) {
    return {
      code: 200,
      success: true,
      data: review,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "review is not found",
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
  let reviews = await Review.find(filter)
  .populate({ path: "user", select: "Name image" })
  .populate({ path: "product", select: "name image" });
  if(reviews){
  return {
    code: 200,
    success: true,
    reviews,
  };
}
else{
  return {
    code: 404,
    success: false,
    error: "reviews not found",
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
    let review = await this.isExist({title:form.title});
  if (!review.success) {
    const newReview = new Review(form);
    await newReview.save();
    return {
      code: 201,
      success: true,
      data: newReview,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Review already exists",
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

exports.update = async (id, form) => {
  try{
  let review = await this.isExist({ _id: id });
  if (review.success) {
   let result= await Review.findByIdAndUpdate(id, form);
    return {
      code: 201,
      success: true,
      data: result,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Review not found",
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
    let data = await Review.findOne(filter)
   .populate({ path: "user", select: "Name image" })
   .populate({ path: "product", select: "name image" });
    if(data){
    return {
      code: 200,
      success: true,
      data,
    }
  } else {
    return {
      code: 404,
      success: false,
      error: "Review not found",
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

exports.remove = async (id) => {
  try{
  const review = await this.isExist({ _id: id });
  if (id && review.success) {
    let result=await Review.findByIdAndDelete(id);
    return {
      code: 200,
      success: true,
      data:result
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "review not found",
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
