let joi=require("joi");

module.exports={

createWishlistValidation:{
    body:joi.object().required().keys({

      user: joi.string().empty().required().messages({
        "string.base": "please enter a valid user Id",
        "any.required": "user id must be entered",
        "string.empty": "user id cannot be empty"
    }),

    dateAdded:joi.date().empty().optional().messages({
        "date.base":"please enter a valid dateAdded",
        "date.empty":"dateAdded cannot be empty",        
      }),

    products: joi.alternatives().optional().try(
      joi.object().optional().keys({
          product: joi.object().required().messages({
              "object.base": "please enter a valid product",
              "any.required": "product must be entered"
          }),

          store: joi.string().empty().required().messages({
            "string.base": "please enter a valid store Id",
            "any.required": "store Id must be entered",
            "string.empty": "store id cannot be empty"
        }),

      }).messages({
          "object.base": "please enter a valid products"
      }),

    joi.array().min(2).optional().items(joi.object().optional().keys({
      product: joi.object().required().messages({
          "object.base": "please enter a valid product",
          "any.required": "product must be entered"
      }),

      store: joi.string().empty().required().messages({
        "string.base": "please enter a valid store Id",
        "any.required": "store Id must be entered",
        "string.empty": "store id cannot be empty"
    }),
     
  }).messages({
      "object.base": "please enter a valid product"
  })).messages({
      "array.base": "please enter a valid products",
      "array.min": "you have to enter at least one product"
  })
    ),
  
  },
    )}

}