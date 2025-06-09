const razorPayService = require("../services/razorpayService")

exports.createPayment = async (req,res)=>{
    try{
const {amount, receipt} = req.body
if(!amount) return res.status(400).json({message:"amount requires"})
const order = await razorPayService.createOrder(amount, "INR", receipt || "receipt_order_001")
res.status(201).json(
    {order}
)
    }catch(err){
res.status(500).json({message:err.message})
    }
}