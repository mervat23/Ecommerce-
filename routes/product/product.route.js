const router=require("express").Router();
const productController=require("../../controllers/product/product.controller")
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")
const {createProductValidation}=require("../../validation/productValidation/product.createValidation")
const {updateProductValidation}=require("../../validation/productValidation/product.updateValidation")
const validator=require("../../helpers/common.validate") 


router.get("/getAllProducts",authenticateToken(endPoints.GET_ALL_PRODUCTS),
productController.getAllProducts) 
router.get("/product/:id",authenticateToken(endPoints.GET_PRODUCT_BY_ID),
productController.getProductById)

router.post("/createProduct",authenticateToken(endPoints.CREATE_PRODUCT),
validator(createProductValidation),productController.addProduct) 

router.put("/updateProduct/:id",authenticateToken(endPoints.UPDATE_PRODUCT),
validator(updateProductValidation),productController.updateProduct) 

router.delete("/deleteProduct/:id",authenticateToken(endPoints.DELETE_PRODUCT),
productController.deleteProduct)  




module.exports=router
