let joi=require("joi");

module.exports={

createReviewValidation:{
    body:joi.object().required().keys({

     title:joi.string().empty().required().messages({
        "string.base":"please enter a valid title ",
        "string.empty":"title cannot be empty",
        "any.required":"title must be entered",
      }),

      content:joi.string().empty().required().messages({
        "string.base":"please enter a valid content ",
        "string.empty":"content cannot be empty",
        "any.required":"content must be entered",
      }),

      created_at:joi.date().required().messages({
        "date.base":"please enter a valid created_at ",
        "any.required":"created_at must be entered",
      }),

      user:joi.string().empty().required().messages({
        "string.base":"please enter a valid user ",
        "string.empty":"user cannot be empty",
        "any.required":"user must be entered",
      }),

      product:joi.string().empty().required().messages({
        "string.base":"please enter a valid product ",
        "string.empty":"product cannot be empty",
        "any.required":"product must be entered",
      }),

      rating: joi.number().optional().min(1).max(5).messages({
        "number.base": "please enter a valid rating",
        "number.min": "rating must be between 1 and 5",
        "number.max": "rating must be between 1 and 5"
    }),
  })
},

}