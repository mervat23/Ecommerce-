const router=require("express").Router();
const wishlistController=require("../../controllers/wishlist/wishlist.controller")
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")
const {createWishlistValidation}=require("../../validation/wishlistValidation/wishlist.createValidation")
let validator=require("../../helpers/common.validate"); 


router.get("/getAllWishlists",authenticateToken(endPoints.GET_ALL_WISHLISTS),
wishlistController.getAllWishlists) 
router.get("/getWishlist",authenticateToken(endPoints.GET_WISHLIST_BY_ID),
wishlistController.getWishlist) 

router.post("/addProductToWishlist",authenticateToken(endPoints.ADD_PRODUCT_TO_WISHLIST),
wishlistController.addProductToWishlist)

router.delete("/deleteItemFromWishlist",authenticateToken(endPoints.REMOVE_PRODUCT_FROM_WISHLIST),
wishlistController.deleteItemFromWishlist)  

module.exports=router 

