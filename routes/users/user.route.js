const router=require("express").Router();
const userController=require("../../controllers/user/user.controller")
const { verifyToken} = require("../../utils/token.util");
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")
const {createUserValidation,loginValidation,resetPasswordValidation}=require("../../validation/userValidation/user.createValidation")
const {updateUserValidation}=require("../../validation/userValidation/user.updateValidation")
let validator=require("../../helpers/common.validate") 



router.get("/getAllUsers",authenticateToken(endPoints.GET_ALL_USERS),
userController.getAllUsers) 
router.get("/user/:id",authenticateToken(endPoints.GET_USER_BY_ID),
userController.getUserById)
router.get('/verify/:token',verifyToken)


router.post("/register",authenticateToken(endPoints.REGISTER),
validator(createUserValidation),userController.register) 
router.post("/login",authenticateToken(endPoints.LOGIN),
validator(loginValidation),userController.login);
router.post("/resetPassword",authenticateToken(endPoints.RESET_PASSWORD),
validator(resetPasswordValidation),userController.resetPassword);

router.put("/updateUser/:id",authenticateToken(endPoints.UPDATE_USER),
validator(updateUserValidation),userController.updateUser)

router.delete("/deleteUser/:id",authenticateToken(endPoints.DELETE_USER),
userController.deleteUser)  



module.exports=router
