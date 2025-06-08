const mongoose = require('mongoose')
const Product = require('./productModel')

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    items:[{
Product:{
    type: mongoose.Schema.Types.ObjectId,
    quantity:Number,
    price:Number
},
totalAmount:Number,
shippingaddress:{
    fullName:String,
    phone:String,
    street:String,
    city:String,
    postalcode:String,
    state:String,
    country:String

},
paymentMethos:{
    type:String,
    enum:["COD","Strype","PayPal"],
    default:"COD"
},
status:{
    type:String,
    default:'pending',
    
},
createdAt: {
    type:Date,
    default: Date.now
}
    }]
})
const Order = mongoose.model("Order",orderSchema)
module.exports= Order