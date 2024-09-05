let app=require("express").Router()
let exportController=require("../../controllers/export.controller")

app.get("/export/users",exportController.exportUsers)

module.exports=app