let joi=require("joi");

module.exports={
    
createProductValidation:{
    body:joi.object().required().keys({
          
      name:joi.string().empty().required().pattern(new RegExp(/^[a-z ]+$/i)).messages({
        "string.base":"please enter a valid  name ",
        "string.empty":" name cannot be empty",
        "any.required":"name must be entered",
        "string.pattern.base":"please enter a valid name"
      }),

      price:joi.number().empty().required().messages({
        "number.base":"please enter a valid price ",
        "number.empty":"price cannot be empty",
        "any.required":"price must be entered",
        "number.alphanum":"please enter a valid price",
        
      }),

      description:joi.string().empty().min(10).max(120).optional().messages({
        "string.base":"please enter a valid description ",
        "string.empty":"description cannot be empty",
        "string.min":"description must be between 10 and 120",
        "string.max":"description must be between 10 and 120",
      }),

      image:joi.array().optional().messages({
        "object.base":"please enter a valid image ",
      }),

    category_name:joi.string().min(10).max(20).required().messages({
        "string.base":"please enter a valid  category_name",
        "string.min":"category_name must be between 10 and 20",
        "string.max":"category_name must be between 10 and 20",
        "any.required":"category_name must be entered",
      }),
      
      availability:joi.boolean().optional().messages({
        "number.base": "please enter a valid availability",
    }),
      rate: joi.number().optional().min(1).max(5).messages({
        "number.base": "please enter a valid rate",
        "number.min": "rate must be between 1 and 5",
        "number.max": "rate must be between 1 and 5"
    }),

    numOfReviews: joi.number().optional().messages({
        "number.base": "please enter a valid numOfReviews",
    }),

      store: joi.string().empty().required().messages({
        "string.base": "please enter a valid store Id",
        "string.empty": "store id cannot be empty",
        "any.required":"store id must be entered",
    }),
  })
},


}