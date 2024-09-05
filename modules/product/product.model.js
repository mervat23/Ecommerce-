const mongoose=require("mongoose")

let productSchema=mongoose.Schema({
   name:{type:String,required:true},  
   price:{type:Number,required:true}, 
   description:{type:String,required:true}, 
   image:[{type:Object}], 
   category_name:{type:String,required:true}, 
   availability: { type: Boolean, default: true },
   rate: { type: Number, min: 1, max: 5, default: 2.5 },
   numOfReviews: { type: Number, default: 0 },
   store: {type: mongoose.Types.ObjectId,ref: "stories"},

})

let productModel=mongoose.model("products",productSchema)

module.exports=productModel