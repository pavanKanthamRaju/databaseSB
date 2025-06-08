const mongoose =require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    email:{
        type : String,
        required : true,
        lowercase : true,
        unique: true

    },
    password:{
        type: String,
        required: true,
    },
    cart:[
        {
        productId : {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product',
        },
        quantity:{
            type:Number,
            default:1
        }
    }
    ]
})
userSchema.pre("save", async function(next){
    if(!this.isModified('password')){
       
       return next();
    }
    this.password = await bcrypt.hash(this.password,12);
    next();
})
    
    userSchema.methods.correctPassword = async (candidatePassword, userPassword)=>{
        // return await bcrypt.compare(candidatePassword, userPassword)
        console.log(`cdpswd ${candidatePassword}`)
        console.log(`uspwd ${userPassword}`)
        return candidatePassword === userPassword;

    }
    userSchema.methods.generateToken =function(){
        const jwt = require('jsonwebtoken');
        return jwt.sign({id:this._id},process.env.JWT_SECRET, {
            expiresIn:'7d'
        })
        
    }
    const User = mongoose.model("User", userSchema);
    module.exports = User
