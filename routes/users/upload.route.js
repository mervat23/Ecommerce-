let app=require("express").Router()
let uploadController=require("../../controllers/user/user.controller")
const {uploadImage}=require("../../helpers/uploader.helper")
const upload=uploadImage("User")
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")



app.put("/uploadImage",authenticateToken(endPoints.UPLOAD_USER_IMAGE),
upload.array('image',1),uploadController.uploadImage)

app.delete("/deleteImage",authenticateToken(endPoints.DELETE_USER_IMAGE),
uploadController.deleteImage)

module.exports=app