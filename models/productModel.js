const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:String,
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:["Men","Women","Kids","Unisex"]
    },
    stock:{
        type:Number,
        default:0
    },
    imageUrl:String,
    sizes:[String]
   
},{
    timestamps: true 
  })
const Product = mongoose.model('Product',productSchema);
module.exports= Product;