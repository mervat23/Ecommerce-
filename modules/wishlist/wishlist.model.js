const mongoose=require("mongoose")

let whishListSchema=mongoose.Schema({
  products: [
    {
    _id: { type: mongoose.Types.ObjectId, ref: "products" },
    product: {
    type: Object,
    ref: "products"
    },
    store: { type: mongoose.Types.ObjectId, ref: "stores" },
  }
],
  user:{ type:mongoose.Types.ObjectId, ref:"users", required: true}, 
  dateAdded: { type: Date,required: true,default: Date.now}
})

let whishListModel=mongoose.model("wishlist",whishListSchema)

module.exports=whishListModel