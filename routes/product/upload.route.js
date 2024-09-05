let app=require("express").Router()
let uploadController=require("../../controllers/product/product.controller")
const {uploadImage}=require("../../helpers/uploader.helper")
const upload=uploadImage("Product")
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")



app.put("/image",
upload.array('image',6),authenticateToken(endPoints.UPLOAD_IMAGE),uploadController.uploadImage)

app.put("/addImage", 
upload.array('image', 6),authenticateToken(endPoints.ADD_IMAGES_TO_ARRAY), uploadController.addImagesToArray)

app.delete("/image",authenticateToken(endPoints.DELETE_IMAGE),
uploadController.deleteImage)

app.delete("/removeImage",authenticateToken(endPoints.REMOVE_IMAGES_FROM_ARRAY),
uploadController.removeImagesFromArray)

module.exports=app