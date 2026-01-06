const Cart = require("../model/Cart");

const getCartsByEmail = async(req, res) => {
    try {
        const email = req.query.email;
        
        const query = {email: email};
        const result = await Cart.find(query).exec();
        res.status(200).json(result)
    } catch(error) {
        res.status(500).json({message : error.message});
    }
}

//post a cart when add to cart btn clicked
// const addToCart = async(req, res)=> {
//     try{
//         const {menuItemId, name, recipe, image, price, quantity, email} = req.body;

//         console.log("Req : ",req.body);
        
//         //existing menu item
//         const existingCartItem = await Cart.findOne({menuItemId});
//         if(existingCartItem){
//             return res.status(400).json({message: "Product is already in the cart!"});
//         }        

//         const cartItem = await Cart.create({
//             menuItemId, name, recipe: recipe || "", image, price, quantity, email
//         })        

//         res.status(201).json({message:"Your item is Successfully added to the cart",cartItem})
//     }catch(error) {
//         res.status(500).json({message: error.message});
//     }
// }


const addToCart = async (req, res) => {
  try {
    const {
      menuItemId,
      name,
      recipe,
      image,
      price,
      quantity,
      email,
    } = req.body;

    if (!email || !menuItemId) {
      return res.status(400).json({
        message: "Invalid cart data",
      });
    }

    // ✅ Correct existence check (email + menuItemId)
    const existingCartItem = await Cart.findOne({
      email: email,
      menuItemId: menuItemId,
    });

    if (existingCartItem) {
      return res.status(409).json({
        message: "Product is already in your cart!",
      });
    }

    const cartItem = await Cart.create({
      menuItemId,
      name,
      recipe: recipe || "",
      image,
      price,
      quantity,
      email,
    });

    res.status(201).json({
      message: "Your item was successfully added to the cart",
      cartItem,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


//delete a cart item
const deleteCart = async (req, res) => {
    const cartId = req.params.id;
    try{
        const deletedCart = await Cart.findByIdAndDelete(cartId);
        if(!deletedCart){
            return res.status(401).json({message: "Cart items not found!"})
        }

        res.status(200).json({message: "Cart Item deleted Successfully"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

//update a cart item
const updateCart = async (req, res) => {
    const cartId = req.params.id;
    const {menuItemId, name, recipe, image, price, quantity, email} = req.body;

    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            cartId, {menuItemId, name, recipe, image, price, quantity, email}, 
            {new: true, runValidators: true}
        )
        if(!updatedCart){
            return res.status(404).json({message: "Cart Item not found"});
        }
        res.status(200).json(updatedCart)
    }catch(error)
    {
        res.status(500).json({message: error.message});
    }


 }

 //get single recipe
 const getSingleRecipe = async(req, res) => {
    const cartId = req.params.id;
    try {
        const cartItem = await Cart.findById(cartId);
        res.status(200).json(cartItem)
    } catch (error) {
        res.status(500).json({message: error.message});
    } 
 } 

module.exports = {
    getCartsByEmail,addToCart,deleteCart,updateCart, getSingleRecipe
}