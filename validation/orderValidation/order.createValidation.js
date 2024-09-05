let joi=require("joi");

module.exports={

createOrderValidation:{
    body:joi.object().required().keys({

        user: joi.string().empty().required().messages({
            "string.base": "please enter a valid user Id",
            "any.required": "user id must be entered",
            "string.empty": "user id cannot be empty"
        }),

        store: joi.string().empty().optional().messages({
            "string.base": "please enter a valid store Id",
            "string.empty": "store id cannot be empty"
        }),

        delivery: joi.string().empty().optional().messages({
            "string.base": "please enter a valid delivery Id",
            "string.empty": "delivery id cannot be empty"
        }),

        products: joi.alternatives().optional().try(
            joi.object().optional().keys({
                product: joi.object().required().messages({
                    "object.base": "please enter a valid product",
                    "any.required": "product must be entered"
                }),
                quantity: joi.number().required().messages({
                    "number.base": "please enter a valid quantity",
                    "any.required": "quantity must be entered"
                }),
                total: joi.number().required().messages({
                    "number.base": "please enter a valid total cost ",
                    "any.required": "total must be entered"
                }),
            }).messages({
                "object.base": "please enter a valid products"
            }),
          joi.array().min(2).optional().items(joi.object().optional().keys({
            product: joi.object().required().messages({
                "object.base": "please enter a valid product",
                "any.required": "product must be entered"
            }),
            quantity: joi.number().required().messages({
                "number.base": "please enter a valid quantity",
                "any.required": "quantity must be entered"
            }),
            total: joi.number().required().messages({
                "number.base": "please enter a valid total cost",
                "any.required": "total must be entered"
            }),
        }).messages({
            "object.base": "please enter a valid product"
        })).messages({
            "array.base": "please enter a valid products",
            "array.min": "you have to enter at least one product"
        })
          ),
          total: joi.number().required().messages({
            "number.base": "please enter a valid total cost",
            "any.required": "total cost must be entered"
        }),

        startDate:joi.date().empty().optional().messages({
            "date.base":"please enter a valid startDate ",
            "date.empty":"startDate cannot be empty",
            
          }),
          endDate:joi.date().empty().optional().messages({
            "date.base":"please enter a valid endDate ",
            "date.empty":"endDate cannot be empty",
    
          }),
    
          status:joi.string().empty().optional().messages({
            "string.base":"please enter a valid status ",
            "string.empty":"status cannot be empty",    
          }),
    
    })
}
}
       
    