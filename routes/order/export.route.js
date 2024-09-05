let app=require("express").Router()
let exportController=require("../../controllers/export.controller")

app.get("/export/orders",exportController.exportOrders)

module.exports=app