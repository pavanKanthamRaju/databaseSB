const Product = require("../models/productModel");

exports.getAllProducts = async (req,res)=>{
try{
    let filter ={}
    if(req.query.category){
        filter.category = req.query.category
    }
    const products = await Product.find(filter)
    res.status(200).json({status:"success",data:products})
}
catch(err){
    res.status(500).json({message:err.message})
}
}
exports.getProducrtById = async(req,res)=>{
    try{
      const product = await Product.findById(req.params.id)
      if(!product) return res.status(404).json({message:"product not found"})
      res.status(200).json({status:"success", product})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
exports.createProduct = async (req,res)=>{
    try{
        const newProduct = await Product.create(req.body);
        res.status(201).json({status:"success", newProduct})
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}