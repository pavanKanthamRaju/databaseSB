const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async ()=>{
    try{
const con = await mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
})
console.log(`Mongo Db connected ${con.connection.host}`)
    }
    catch (error){
console.error("Mongo Db not connected",error)
process.exit(1)
    }
}
module.exports = connectDB;