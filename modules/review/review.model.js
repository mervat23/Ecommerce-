const mongoose=require("mongoose")


let reviewSchema=mongoose.Schema({
  title:String, 
  content:String,
  created_at:Date,  
 user:{type:mongoose.Types.ObjectId,ref:"users" },
 product: { type: mongoose.Types.ObjectId, ref: "products" },
 rating: { type: Number, required: true, min: 1, max: 5, default: 2.5 },

  
})

let reviewModel=mongoose.model("review",reviewSchema)

module.exports=reviewModel