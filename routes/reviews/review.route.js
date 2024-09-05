const router=require("express").Router();
const reviewController=require("../../controllers/review/review.controller")
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")
const {createReviewValidation}=require("../../validation/reviewValidation/review.createValidation")
const {updateReviewValidation}=require("../../validation/reviewValidation/review.updateValidation")
let validator=require("../../helpers/common.validate") 


router.get("/getAllReviews",authenticateToken(endPoints.GET_ALL_REVIEWS),
reviewController.getAllReviews) 
router.get("/review/:id",authenticateToken(endPoints.GET_REVIEW_BY_ID),
reviewController.getUserReviewById)

router.post("/createReview",authenticateToken(endPoints.CREATE_REVIEW),
validator(createReviewValidation),reviewController.addReview) 

router.put("/updateReview/:id",authenticateToken(endPoints.UPDATE_REVIEW),
validator(updateReviewValidation),reviewController.updateReview) 

router.delete("/deleteReview/:id",authenticateToken(endPoints.DELETE_REVIEW),
reviewController.deleteReview)  

module.exports=router
