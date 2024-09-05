const mongoose=require("mongoose")

  const orderSchema =mongoose.Schema({
  user: {
      type: mongoose.Types.ObjectId,
      ref: "users"
  },
  store: {
      type: mongoose.Types.ObjectId,
      ref: "stores"
  },
  products: [
      {
          _id: { type: mongoose.Types.ObjectId, ref: "products" },
          product: {
            type: Object
          },
          quantity: Number,
          total: Number
      }
  ],
  total: { type: Number, required: true },
  startDate: { type: Date },
  EndDate: { type: Date },
  status: { type: String, enum: ["accepted", "pending"], default: "pending" },
  
  });


let orderModel=mongoose.model("order",orderSchema)

module.exports=orderModel