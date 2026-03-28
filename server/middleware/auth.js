 
import jwt from "jsonwebtoken"

 function isAuth(req,res,next){
    const token = req.cookies?.token

    if(!token){
        return res.status(400).json({msg:"token not found"})
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    if(!decoded){
        return res.status(400).json({msg:"token is not correct"})
    }

    req.userid = decoded.id

     

    next()

 }

 export default isAuth

 