const wishlistRepo=require("../../modules/wishlist/wishlist.repo")
const loggingService=require("../../services/logger.services")
const wishlistLogger=new loggingService("wishlist","wishlist.controller")
const auditService=require("../../services/audit.services")

const dateFormat=()=>{
  return new Date(Date.now())
}


let addProductToWishlist = async (req, res) => {
    try{
    const result=await wishlistRepo.addProduct(req.body.user,req.body.product)    
    if (result.success) {
        return res.status(result.code).json(result);
      } else {
        return res
          .status(result.code)
          .json({ success: false, error: result.error });
      }
    }catch(err){
        res.status(500).json({err: "failed to add item to wishlist!"})  
    }
 }


const getAllWishlists=async(req,res)=>{
    try{
    let result=await wishlistRepo.list()   
    if(result.success){          
      let info={Action:req.originalUrl,Status:200}
     wishlistLogger.info("Return All wishlists",info)  
     auditService.prepareAudit("GET_ALL_WISHLISTS",result,null,"wishlist",dateFormat())      
    res.status(result.code).json(result)
    }else{
      res.status(result.code).json({success:result.success,error:result.error})
    }
 }catch(err){
     wishlistLogger.error(err.message)
     auditService.prepareAudit("GET_ALL_WISHLISTS",null,err,"wishlist",dateFormat())
    res.status(500).json({err: "failed to get wishlists!"})  
}
}


const getWishlist=async(req,res)=>{
  try{
    let filter=req.body;
    if(filter){
    let result=await wishlistRepo.get(filter)
    if(result.success){     
     let info={Action:req.originalUrl,Status:200}
     wishlistLogger.info("Return All wishlists",info)          
    res.status(result.code).json(result)
    }else{
      res.status(result.code).json(result)
    }
  }
  else {
    return res.status(result.code).json({ error: result.error });
  }
 }catch(err){
    wishlistLogger.error(err.message)
    res.status(500).json({err: "unexpected error!"})  
}
}


  
const deleteItemFromWishlist=async(req,res)=>{
    try{
  let result= await wishlistRepo.removeItem({user: req.body.user},req.body.product);
  if (result.success) {
    return res.status(result.code).json(result);
  } else {
    return res
      .status(result.code)
      .json({ success: result.success, error: result.error });
  }
}catch(err){
    res.status(500).json({err: "unexpected error!"})  
}

}



module.exports = {
    addProductToWishlist,
    getAllWishlists,
    getWishlist,
    deleteItemFromWishlist,
    
}



