const {
    use
} = require("../app");
const Product = require("../models/productModel");
const User = require("../models/userModel");


exports.addToCart = async (req, res) => {
    const userId = req.user._id;
    const {
        productId,
        quantity
    } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({
            message: "user not found"
        });
        const existingItem = user.cart.find(item => item.productId.toString() == productId)
        if (existingItem) {
            existingItem.quantity +  1
        } else {
            user.cart.push({
                productId,
                quantity:  1
            })
        }
        await user.save();
        res.status(200).json({
            status: "success",
            user
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

  exports.clearCart = async(req,res) =>{
    const userId = req.user._id;
    const { productId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure productId is a string to compare correctly
        // console.log("productId...."+ productId)
       
        user.cart =[];
        // console.log("filtered cart ....."+ user.cart);
        // user.markModified('cart');
       
          
        await user.save();

        res.status(200).json({
            status: "success",
            cart: user.cart, // explicitly return updated cart
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  }
  
exports.removeFromCart = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure productId is a string to compare correctly
        console.log("productId...."+ productId)
       
        // user.cart = user.cart.filter(item => item.productId.toString() !== productId.toString());
        // console.log("filtered cart ....."+ user.cart);
        // user.markModified('cart');
        const existingItemIndex = user.cart.findIndex(
            (item) => item.productId.toString() === productId
          );
         
          if (existingItemIndex > -1) {
            const existingItem = user.cart[existingItemIndex];
            
            if (existingItem.quantity <= 1) {
              // ❌ Remove item if quantity is 1 or decrementing it to 0
              user.cart.splice(existingItemIndex, 1);
            
            } else {
              // ➖ Decrease quantity
              console.log("existing item index.."+ existingItem)
              existingItem.quantity -= 1;
            }
          } else {
            // ➕ Add new item to cart
          }
          console.log("final cart.."+user.cart)
        await user.save();

        res.status(200).json({
            status: "success",
            cart: user.cart, // explicitly return updated cart
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.getcart = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId).populate("cart.productId");
        if (!user) return res.stat(400).json({
            message: "user not found"
        });
        res.status(200).json({
            status: "succes",
            cart: user.cart
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}