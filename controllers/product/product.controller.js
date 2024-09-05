const repo=require("../../modules/product/product.repo")
const fs=require("fs")
const loggingService=require("../../services/logger.services")
const productLogger=new loggingService("products","products.controller")
const auditService=require("../../services/audit.services")

const dateFormat=()=>{
  return new Date(Date.now())
}


let addProduct = async (req, res) => {
    try{
    let result=await repo.create(req.body)        
    if (result.success) {
        return res.status(result.code).json(result);
      } else {
        return res.status(result.code).json({error: result.error });
      }
    }catch(err){
        res.status(500).json({err: "unexpected error"})  
    }
 } 


 const getProductById=async(req,res)=>{
    try{
    let id=req.params.id;
     let result=await repo.get({_id:id}) 
     if (result.success) {
      let info={Action:req.originalUrl,Status:200}
      productLogger.info("Return All products",info)  
        return res.status(result.code).json(result);
      } else {
        return res.status(result.code).json({error: result.error});
      }
    }catch(err){
      productLogger.error(err.message)
      res.status(500).json({err: "unexpected error!"})  
    }
} 


const getAllProducts=async(req,res)=>{
    try{
    let result=await repo.list()       
    if (result.success) {
    let info={Action:req.originalUrl,Status:200}
    productLogger.info("Return All products",info)  
    auditService.prepareAudit("GET_ALL_PRODUCTS",result,null,"product",dateFormat())    
      return res.status(result.code).json(result);
    } else {
      return res.status(result.code).json({error: result.error});
    }
  }catch(err){
    productLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_PRODUCTS",null,err,"product",dateFormat())
    res.status(500).json({err: "unexpected error!"})  
}
} 


const updateProduct=async(req,res)=>{
    try{
    let result=await repo.update(req.params.id,req.body);
        if (result.success) {
            return res.status(result.code).json(result);
          } else {
            return res.status(result.code).json({error: result.error });
          }
   }catch(err){
    res.status(500).json({err: "unexpected error!"})  
 }
} 

const deleteProduct=async(req,res)=>{
    try{
   const result=await repo.remove(req.params.id);
   if (result.success) {
    return res.status(result.code).json(result);
  } else {
    return res.status(result.code).json({error: result.error });
  }
 }catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
}

} 



const uploadImage = async (req, res) => {
  try {
    let image = req.files;
    const result = await repo.isExist({ _id:req.query.id})
    if (result.success) {
      let oldImage = (result.success && result.data.image) ? (result.data.image) : false
      if (oldImage) {
        try {
          await oldImage.map((image) => {
            fs.unlinkSync(image.path);
          })
        }
        catch (err) {
          console.log(`err`, err.errno);
        }
      }
      const update = await repo.update(req.query.id, { image: image });
      console.log(update)
      if (update.success) {
        res.status(update.code).json({ success: update.success, data: update.data.image, code: update.code });
      }
      else {
        res.status(update.code).json({ success: update.success, error: update.error, code: update.code });
      }
    }
    else {
      res.status(result.code).json({ success: result.success, error: result.error, code: result.code });
    }
  } catch (err) {
    console.log(`err.message`, err.message);
    res.status(500).json({
      success: false,
      code: 500,
      error: "Unexpected Error!"
    });
  }
}


const addImagesToArray=async(req,res)=>{
  try{
   const product=await repo.isExist({_id:req.query.id})
   if(product.success){
   let oldImage=(product.success&&product.data.image) ? (product.data.image) : false
   let count=oldImage.length+req.files.length
   let image=req.files
   if(count<=6){
   await image.map((image)=>{
    oldImage.push(image)
   })
   }
   else{
    res.status(400).json({
      success:false,
      code:400,
      error:"the number of product images must be a maximum of 6 images"
    })
   }
   const update=await repo.update(req.query.id,{image:oldImage})
   if(update.success){
    res.status(update.code).json({success:update.success,data:update.data.image, code: update.code})
   }
   else{
    res.status(update.code).json({success:update.success,error:update.error, code: update.code})
   }
  }
  
  else {
    res.status(product.code).json({ success: product.success, error: product.error, code: product.code });
  }

  }catch(err){
    console.log("error"+err.message)
    return{
     success:false,
     code:500,
     error:"unexpected error"
  }
  }
} 



const deleteImage = async (req, res) => {
  try {
    const result = await repo.isExist({ _id: req.query.id })
    if (result.success) {
      let oldImage = (result.success && result.data.image) ? (result.data.image) : false
      if (oldImage) {
        try {
          await oldImage.map((image) => {
            fs.unlinkSync(image.path);
          })
        }
        catch (err) {
          console.log(`err`, err.errno);
        }
      }
      const update = await repo.update(req.query.id, { image: [] });
      if (update.success) {
        res.status(update.code).json({ success: update.success, code: update.code });
      }
      else {
        res.status(update.code).json({ success: update.success, error: update.error, code: update.code });
      }
    }
    else {
      res.status(result.code).json({ success: result.success, error: result.error, code: result.code });
    }
  } catch (err) {
    console.log(`err.message`, err.message);
    res.status(500).json({
      success: false,
      code: 500,
      error: "Unexpected Error!"
    });
  }
}


const removeImagesFromArray = async (req, res) => {
  try {
    const result = await repo.isExist({ _id: req.query.id });
    let image=req.body.image;
    if (result.success) {
        repo.update(req.query.id,{ $pull: { image: { path:image } } });
        fs.unlinkSync(image);
        res.status(200).json({ success: true, code: 200 });
    }
    else {
      res.status(result.code).json({ success: result.success, error: result.error, code: result.code });
    }
  } catch (err) {
    console.log(`err.message`, err.message);
    res.status(500).json({
      success: false,
      code: 500,
      error: "Unexpected Error!"
    });
  }
}
 

module.exports = {
   addProduct,
   getProductById,
   getAllProducts,
   updateProduct,
   deleteProduct,

   uploadImage,
   addImagesToArray,
   deleteImage,
   removeImagesFromArray
}



