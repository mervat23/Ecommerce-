const mongoose=require("mongoose")

let cartSchema=mongoose.Schema({
   products:[
      {
    _id:{type:mongoose.Types.ObjectId, ref:"products"},
    product:{
      type:Object,
   },
    quantity:Number, 
    total:Number,
   }
],

   total:{type:Number,required:true},
   user:{type:mongoose.Types.ObjectId,ref:"users",required:true},
   store: {type: mongoose.Types.ObjectId,ref: "stories"},

     
})

let cartModel=mongoose.model("carts",cartSchema)

module.exports=cartModel