const router=require("express").Router();
const orderController=require("../../controllers/order/order.controller")
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")
const {createOrderValidation}=require("../../validation/orderValidation/order.createValidation")
const {updateOrderValidation}=require("../../validation/orderValidation/order.updateValidation")
let validator=require("../../helpers/common.validate") 


router.get("/getAllOrders",authenticateToken(endPoints.GET_ALL_ORDERS),
orderController.getAllOrders) 
router.get("/order/:id",authenticateToken(endPoints.GET_ORDER_BY_ID),
orderController.getOrderById)

router.post("/checkoutOrder",authenticateToken(endPoints.CHECK_OUT_ORDER),
orderController.checkoutOrder)

router.put("/updateOrder/:id",authenticateToken(endPoints.UPDATE_ORDER),
orderController.updateOrder)

router.delete("/cancelOrder/:id",authenticateToken(endPoints.CANCEL_ORDER),
orderController.cancelOrder)  

module.exports=router
