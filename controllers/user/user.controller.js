const repo=require("../../modules/user/user.repo")
let{sendMail}=require("../../utils/email.util")
let utils=require("../../utils/token.util")
const fs=require("fs")
const loggingService=require("../../services/logger.services")
const userLogger=new loggingService("user","user.controller")
const auditService=require("../../services/audit.services")

const dateFormat=()=>{
  return new Date(Date.now())
}

let register = async(req, res) => {
    try{
    const result=await repo.create(req.body)    
    if (result.success) {
    payload = {
        _id: result.data._id, Name: result.data.Name, Email: result.data.Email,
        role: result.data.role
      }
    const token = utils.generateToken(payload);
    const activationLink=`Hi! There, You have recently visited 
    our website and entered your email. 
    Please follow the given link to verify your email 
    http://localhost:3000/verify/${token} 
    Thanks` 
    await sendMail(
      result.data.Email,
      "loxif35942@mainoj.com",
      'Email Verification',
      activationLink,
    )
   
     res.status(result.code).json({token,result,activationLink})
    }
    else {
      res.status(result.code).json(result);
    }
    }catch(err){
        res.status(500).json({err: "unexpected error!"})  
    }
 }


const getUserById=async(req,res)=>{
    try{
     let id=req.params.id;
     let result=await repo.get({_id:id}) 
     if(result.success){
      let info={Action:req.originalUrl,Status:200}
      userLogger.info("Return All Users",info)      
     res.status(result.code).json(result)
     }
    else{
      res.status(result.code).json({error:result.error });
     }
    }catch(err){
      userLogger.error(err.message)
      res.status(500).json({err: "unexpected error!"})  
    }
}


const getAllUsers=async(req,res)=>{
    try{
    let allUsers=await repo.list()
    if(allUsers.success){
      let info={Action:req.originalUrl,Status:200}
      userLogger.info("Return All Users",info)  
      auditService.prepareAudit("GET_ALL_USERS",allUsers,null,"user",dateFormat())    
    res.status(allUsers.code).json(allUsers)
    }else{
      res.status(allUsers.code).json({ error:allUsers.error });
    }
  }catch(err){
    
    userLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_USERS",null,err,"user",dateFormat())
    res.status(500).json({err: "unexpected error!"})  
}
}


const updateUser=async(req,res)=>{
    try{
    const targetUserId=req.params.id;
    let user=await repo.update({_id:targetUserId},req.body);
    if(user.success){
    res.status(user.code).json(user);
    }else{
      res.status(user.code).json({error:user.error});
    }
  }catch(err){
    res.status(500).json({err: "unexpected error!"})  
 }
}


const deleteUser=async(req,res)=>{
    try{
   let result= await repo.remove(req.params.id)
   if(result.success){
   res.status(result.code).json({result});
   }else{
    res.status(result.code).json({error:result.error});
   }
 }catch(err){
    res.status(500).json({err: "unexpected error!"})  
}

}


let login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const result = await repo.comparePassword(Email, Password);
    if (result.success) {
       payload = {
        _id: result.data._id,Name: result.data.Name, Email: result.data.Email,
        role: result.data.role
      }
      const token = utils.generateToken(payload);
      res.status(result.code).json({token,result})
    }
    else {
      res.status(result.code).json({result})
    }
  } catch (err) {
    res.status(500).json({err: "unexpected error!"})  

  }
}


let resetPassword = async (req, res) => {
    try {
        const result = await repo.resetPassword(req.body.Email, req.body.newPassword);
        if(result.success){
        res.status(result.code).json({result});
        }
        else{
          res.status(result.code).json({error:result.error}); 
        }
    } catch (err) {
      res.status(500).json({err: "unexpected error!"})  
    }
}


const uploadImage = async (req, res) => {
  try {
    
      let image = req.files;
      const result = await repo.isExist({ _id:req.query.id})
      console.log(result)
      if (result.success) {
        let oldImage = (result.success && result.data.image) ? (result.data.image) : false
        if (oldImage) {
          try {
            await fs.unlinkSync(oldImage.path);
          }
          catch (err) {
            console.log(`err`, err.errno);
          }
        }
        const update = await repo.update(req.query.id, { image: image[0] });
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
  }
catch (err) {
    console.log(`err.message`, err.message);
    res.status(500).json({
      success: false,
      code: 500,
      error: "Unexpected Error!"
    });
  }



}


const deleteImage = async (req, res) => {
  try {
      const result = await repo.isExist({ _id: req.query.id})
      if (result.success) {
        let oldImage = (result.success && result.data.image) ? (result.data.image) : false
        if (oldImage) {
          try {
            await fs.unlinkSync(oldImage.path);
          }
          catch (err) {
            console.log(`err`, err.errno);
          }
        }
        const update = await repo.update(req.query.id, { $unset: { image: 1 } });
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
    }

   catch (err) {
    console.log(`err.message`, err.message);
    res.status(500).json({
      code: 500,
      success: false,
      error: "Unexpected Error!"
    });
  }
}

module.exports = {
    register, 
    getUserById, 
    getAllUsers,
    updateUser,
    deleteUser, 
    login,
    resetPassword,
    uploadImage,
    deleteImage
    
}




















































































































