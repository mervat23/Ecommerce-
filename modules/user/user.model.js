const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
let saltrounds=5;

let userSchema=mongoose.Schema({
     Name:{type:String, required:true},
     Email:{type:String, required:true},
      Password:{type:String,required:true},
      Address:{type:String,required:true},
      phone:{type:String,required:true},
      image: { type: Object},
      role:{
        type:String,
        enum:["customer","delivery","admin","store"],
        default:"customer",
      },    
})

userSchema.pre("save",async function(next){
 this.Password=await bcrypt.hash(this.Password,saltrounds);
  next();
})


let userModel=mongoose.model("users",userSchema)

module.exports=userModel