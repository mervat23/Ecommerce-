let app=require("express").Router()
let exportController=require("../../controllers/export.controller")

app.get("/export/products",exportController.exportProducts)

module.exports=app