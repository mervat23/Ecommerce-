let joi=require("joi");

module.exports={
updateUserValidation:{
    body:joi.object().required().keys({
      Email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','hhh']}}).empty().optional().messages({
          "string.email":"please enter a valid email ",
          "string.empty":"email cannot be empty"
      }),

      Password:joi.string().empty().optional()
      .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
          "string.base":"please enter a valid password ",
          "string.empty":"password cannot be empty",
          "string.pattern.base":"please enter a valid password A-Z,a-zm0-9,special character"
      }),

      Name:joi.string().empty().optional().pattern(new RegExp(/^[a-z ]+$/i)).messages({
        "string.base":"please enter a valid Name ",
        "string.empty":"Name cannot be empty",
        "string.pattern.base":"please enter a valid Name"
      }),

      Address:joi.string().empty().optional().min(1).max(10).messages({
        "string.base":"please enter a valid address ",
        "string.empty":"address cannot be empty",
        "string.min":"no of characters must be between 1 and 10",
        "string.max":"no of characters must be between 1 and 10",
      }),

      phone:joi.string().empty().min(1).max(11).optional().messages({
        "string.base":"please enter a valid phone ",
        "string.empty": "phone cannot be empty",
        "string.min":"phone must be between 1 and 11",
        "string.max":"phone must be between 1 and 11",
      }),

      image:joi.object().optional().messages({
        "object.base":"please enter a valid image ",
      }),

      role:joi.string().empty().min(1).max(10).optional().messages({
        "string.base":"please enter a valid role ",
        "string.empty":"role can not be empty ",
        "string.min":"role must be between 1 and 10",
        "string.max":"role must be between 1 and 10",
      }),
     
  })
},
}