const repo=require("../../modules/order/order.repo")
const repo2=require("../../modules/cart/cart.repo")
const loggingService=require("../../services/logger.services")
const orderLogger=new loggingService("orders","orders.controller")
const auditService=require("../../services/audit.services")

const dateFormat=()=>{
    return new Date(Date.now())
  }


const checkoutOrder = async (req, res) => {
  try {
      let userId = req.body.user
      if (userId !=req.query._id) return res.status(409).json({ success: false, error: "You can only control your cart!", code: 409 });
      const userCart = await repo2.isExist({ user: userId });
      if (userCart.data.products.length == 0) return res.status(400).json({ success: false, error: "cart is currently empty", code: 400 });
      let today = new Date();
      let nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const form = {
          user: userCart.data.user,
          store: userCart.data.store,
          products: userCart.data.products,
          total: userCart.data.total,
          orderNumber:userCart.data.orderNumber,
          startDate: today,
          defaultEndDate: nextWeek,
          status: "pending"
      };
      const result = await repo.create(form);
      await repo2.flush({ user: userId });
      res.status(result.code).json(result);
  } catch (err) {
      console.log(`err.message`, err.message);
      res.status(500).json({
          success: false,
          code: 500,
          error: "Unexpected Error!"
      });
  }

}


const getOrderById=async(req,res)=>{
    try{
    let id=req.params.id;
     let result=await repo.get({_id:id}) 
     if(result.success) {
      let info={Action:req.originalUrl,Status:200}
      orderLogger.info("Return All orders",info)  
      res.status(result.code).json(result)
       } 
       else {
         return res.status(result.code).json({ error: result.error});
       }
    }catch(err){
      orderLogger.error(err.message)
      res.status(500).json({err: "unexpected error!"})  
    }
} 

const getAllOrders=async(req,res)=>{
    try{
    let result=await repo.list()   
    if(result.success) {
      let info={Action:req.originalUrl,Status:200}
      orderLogger.info("Return All orders",info)  
      auditService.prepareAudit("GET_ALL_ORDERS",result,null,"order",dateFormat())        
      res.status(result.code).json(result)
       } 
       else {
         return res.status(result.code).json({ error: result.error });
       }
 }catch(err){
  orderLogger.error(err.message)
  auditService.prepareAudit("GET_ALL_ORDERS",null,err,"order",dateFormat())
    res.status(500).json({err: "unexpected error!"})  
}
}


const updateOrder=async(req,res)=>{
    try{
    const targetOrderId=req.params.id;
    let result=await repo.update({_id:targetOrderId},req.body)
      if(result.success) {
      res.status(result.code).json(result)
       } 
       else {
        return res.status(result.code).json({ error: result.error });
       }
   }catch(err){
    res.status(500).json({err: "unexpected error!"})  
 }
} 


const cancelOrder=async(req,res)=>{
    try{
    const targetOrderId=req.params.id;
   const result=await repo.cancelOrder({_id:targetOrderId});
   if(result.success) {
    res.status(result.code).json(result)
     } 
     else {
       return res.status(result.code).json({ error: result.error });
     }
 }catch(err){
    res.status(500).json({err: "unexpected error!"})  
}
} 



module.exports = {
   checkoutOrder,
   getOrderById,
   updateOrder,
   getAllOrders,
   cancelOrder,
   
}



