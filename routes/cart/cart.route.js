const router=require("express").Router();
const cartController=require("../../controllers/cart/cart.controller")
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")
let{createCartValidation}=require("../../validation/cartValidation/cart.createValidation")
let{updateCartValidation}=require("../../validation/cartValidation/cart.updateValidation")
let validator=require("../../helpers/common.validate") 


router.get("/getCart",authenticateToken(endPoints.GET_CART),cartController.getCart)
router.get("/getAllItems",authenticateToken(endPoints.GET_ALL_ITEMS)
,cartController.getAllItems) 


router.post("/addItemToCart",authenticateToken(endPoints.ADD_ITEM)
,cartController.addItemToCart) 


router.put("/updateCart/:id",authenticateToken(endPoints.UPDATE_CART),
cartController.updateCart)


router.delete("/deleteItem",authenticateToken(endPoints.DELETE_ITEM),
cartController.deleteItemFromCart)  
router.delete("/flushCart",authenticateToken(endPoints.FLUSH),
cartController.flushCart)


module.exports=router
