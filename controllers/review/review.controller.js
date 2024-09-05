const repo=require("../../modules/review/review.repo")
const loggingService=require("../../services/logger.services")
const reviewLogger=new loggingService("review","review.controller")
const auditService=require("../../services/audit.services")

const dateFormat=()=>{
    return new Date(Date.now())
  }


let addReview = async (req, res) => {
    try{
    let result= await repo.create(req.body)    
    if(result.success){
     res.status(result.code).json(result)
    }else{
    res.status(result.code).json({error:result.error})
    }
    }catch(err){
        res.status(500).json({err: "unexpected error!"})  
    }
 }


 const getUserReviewById=async(req,res)=>{
    try{
    let id=req.params.id;
     let review=await repo.get({_id:id}) 
     if(review.success){
    let info={Action:req.originalUrl,Status:200}
    reviewLogger.info("Return All reviews",info)  
     res.status(review.code).json(review)
     }else{
    res.status(review.code).json({error:review.error})
     }
    }catch(err){
    reviewLogger.error(err.message)
    res.status(500).json({err: "unexpected error!"})  
    }
}

const getAllReviews=async(req,res)=>{
    try{
    let result=await repo.list()
    if(result.success){
    let info={Action:req.originalUrl,Status:200}
    reviewLogger.info("Return All reviews",info)  
    auditService.prepareAudit("GET_ALL_REVIEWS",result,null,"review",dateFormat()) 
    res.status(result.code).json(result)
    }else{
    res.status(result.code).json({error:result.error})
    }
 }catch(err){
    reviewLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_REVIEWS",null,err,"review",dateFormat())
    res.status(500).json({err: "unexpected error!"})  
 }
}


const updateReview=async(req,res)=>{
    try{
    const targetReviewId=req.params.id;
    let result=await repo.update({_id:targetReviewId},req.body);
    if(result.success){
        res.status(result.code).json(result)
        }else{
        res.status(result.code).json({error:result.error})
        }
  }catch(err){
    res.status(500).json({err: "unexpected error!"})  
 }
}


  
const deleteReview=async(req,res)=>{
    try{
  const targetReviewId=req.params.id;
  let result= await repo.remove({_id:targetReviewId});
  if(result.success){
    res.status(result.code).json(result)
    }else{
    res.status(result.code).json({error:result.error})
    }
}catch(err){
    res.status(500).json({err: "unexpected error!"})  
}

}



module.exports = {
    addReview,
    getUserReviewById,
    getAllReviews,
    updateReview,
    deleteReview 
}



