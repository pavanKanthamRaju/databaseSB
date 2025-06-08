const { use } = require('../app');
const User = require('../models/userModel');
exports.login = async (req,res)=>{
const{email, password}  = req.body
if(!email || !password){
    return res.status(400).json({message: "please provide email and password"})
}
const user = await User.findOne({email});
console.log( `user checked....${user}`)
if(!user || !await user.correctPassword(password, user.password)){
    return res.status(401).json({message : "incorrect email or password"})
}
const token = user.generateToken();
res.status(200).json({status:"success", token, user})
}
exports.register = async(req,res)=>{

    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "please provide email and password"})
    }
 try{
const user = await User.create({email,password});
res.status(200).json({status:"success", user})
 }
 catch (err){
res.sta(500).json({message:err.message})
 }
}