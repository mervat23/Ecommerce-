let app=require("express").Router()
let exportController=require("../../controllers/export.controller")

app.get("/export/reviews",exportController.exportReviews)

module.exports=app