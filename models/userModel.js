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
        required: true
    }
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
    const User = mongoose.model("User", userSchema);
    module.exports = User
