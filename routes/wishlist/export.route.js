let app=require("express").Router()
let exportController=require("../../controllers/export.controller")

app.get("/export/wishlists",exportController.exportWishlists)

module.exports=app