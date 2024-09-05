const multer  = require('multer')

exports.uploadImage=(folderName)=>{
    storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,`uploads/${folderName}`)
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+Math.random()+'.jpg')
        }
    })
return multer({storage:storage})
}


exports.handleFileUploadErrors=(error,req,res,next)=>{
    if(error instanceof multer.MulterError){
        if(error.code==="LIMIT_FILE_SIZE"){
            return res.status(400).json({
               message:"file is too large" 
            })
        }
        if(error.code==="LIMIT_FILE_COUNT"){
            return res.status(400).json({
                message:"file limit reached" 
             }) 
        }
        if(error.code==="LIMIT_UNEXPECTED_FILE"){
            return res.status(400).json({
                message:"file must be an image" 
             }) 
        }
    }
}