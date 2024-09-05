let joi=require("joi");

module.exports={

updateReviewValidation:{
    body:joi.object().required().keys({
     title:joi.string().empty().optional().messages({
        "string.base":"please enter a valid title ",
        "string.empty":"title cannot be empty",
      }),

      content:joi.string().empty().optional().messages({
        "string.base":"please enter a valid content ",
        "string.empty":"content cannot be empty",
      }),

      created_at:joi.date().empty().optional().messages({
        "date.base":"please enter a valid created_at ",
        "date.empty":"created_at cannot be empty",
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