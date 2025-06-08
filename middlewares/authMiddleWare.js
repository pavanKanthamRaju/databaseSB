const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

exports.protect = async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message: "Unauthorized - No token"})
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }
    catch(err){
        res.status(401).json({message:"Unauthorised - invalide token"})
    }
}