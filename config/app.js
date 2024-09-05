const express=require("express")
const app=express()
require("dotenv").config()
const connection=require('./database').connection
connection()

const indexRoutes=require("../routes/index.routes")
const { handleFileUploadErrors } = require("../helpers/uploader.helper")
const{handleCorsPolicy}=require("../helpers/cors")




app.use(express.json())
app.use(indexRoutes)
app.use(handleFileUploadErrors)
app.use(handleCorsPolicy)

module.exports=app