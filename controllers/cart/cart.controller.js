const cartRepo=require("../../modules/cart/cart.repo")
const loggingService=require("../../services/logger.services")
const cartLogger=new loggingService("cart","cart.controller")
const auditService=require("../../services/audit.services")


const dateFormat=()=>{
  return new Date(Date.now())
}


 const getCart=async(req,res)=>{
  try{
  let  filter=req.query;
   let result=await cartRepo.get(filter) 
   if(result.success) {
    let info={Action:req.originalUrl,Status:200}
    cartLogger.info("Return All items",info) 
    res.status(result.code).json(result)
     } 
     else {
      res.status(result.code).json(result)
     }
  }catch(err){
    cartLogger.error(err.message)
    res.status(500).json({err: "unexpected error!"})  
  }
} 

let addItemToCart = async(req, res) => {
  try{
    let result=await cartRepo.addItemToCart(req.body.user,req.body.product,req.body.quantity)      
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

let updateCart = async(req, res) => {
  try{
    const targetId=req.params.id;
    let result=await cartRepo.update({_id:targetId},req.body)      
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


const getAllItems=async(req,res)=>{
    try{
    let result=await cartRepo.list() 
    if(result.success) {   
      let info={Action:req.originalUrl,Status:200}
      cartLogger.info("Return All items",info) 
      auditService.prepareAudit("GET_ALL_ITEMS",result,null,"item",dateFormat())
      res.status(result.code).json(result)
         } 
         else {
          return res.status(result.code).json({ error: result.error });
         }  
  }catch(err){
    cartLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_ITEMS",null,err,"item",dateFormat())
    res.status(500).json({err: "unexpected error!"})  
}
}


const deleteItemFromCart=async(req,res)=>{
    try{
   let result=await cartRepo.removeItem(req.body.user,req.body.product,req.body.quantity) 
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


let flushCart = async (req, res) => {
    try {
        const targetId=req.query.id;
         let result=await cartRepo.flush({_id:targetId})
         if(result.success) {
            res.status(result.code).json(result)
             } 
        else {
          return res.status(result.code).json({ error: result.error });
             }
          } catch (err) {
        res.status(500).json({err: "unexpected error!"})  
    }
}


module.exports = {
    getCart,
    addItemToCart,
    updateCart,
    getAllItems,
    deleteItemFromCart,
    flushCart,
}
