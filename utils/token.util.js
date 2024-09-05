const jwt=require("jsonwebtoken")
const  rbac=require("../helpers/rbac")


exports.generateToken=(payload,expiresIn)=>{
    expiresIn = expiresIn ? expiresIn : "30d"
    return jwt.sign(payload,process.env.TOKEN_SECRET ||"secret",{expiresIn})
 }
  
 exports.verifyToken=(req,res,next)=>{
    try{
      const token= req.params.token      
     if(token){
       jwt.verify(token,process.env.TOKEN_SECRET,function(err,decoded){
          if(err) res.status(403).json({message:"Invalid Token"})
          res.status(201).json({message:"Email verified successfully"})
          req.decoded=decoded;
          console.log(req.decoded)
          next();
       })
     }
     else res.status(401).json({message:"Unauthorized"})
    }catch (error) {
       res.status(500).json({
         success: false,
         error,
         message: "Something went wrong with the server",
       });
     }
 }
 

 
exports.authenticateToken= (endpoint) =>{
return async(req, res, next) => {
  const head = req.headers["authorization"];
  const token = head && head.split(" ")[1];
  try {
    if (token) {
      const { role } = jwt.verify(token, process.env.TOKEN_SECRET);
      console.log(role)
      // ROLE_BASED_ACCESS
      const isAllowed =await rbac.can(role, endpoint);
      console.log(isAllowed)
      if (isAllowed) next();
      else
        return res.status(403).json({
          error: "Access denied",
          code: 403,
          data: role,
        });
    } else {
      res.status(401).json({
        success: false,
        error: "No Token found",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error,
      success: false,
      error: "Internal Server Error",
    });
  }
};

}