let app=require("express").Router()
let exportController=require("../../controllers/export.controller")

app.get("/export/carts",exportController.exportCarts)

module.exports=app