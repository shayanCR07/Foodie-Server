const express = require("express");
const Cart = require("../model/Cart")
const router = express.Router();

const cartControllers = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken')

router.get('/',verifyToken, cartControllers.getCartsByEmail);
router.post('/', cartControllers.addToCart);
router.delete('/:id', cartControllers.deleteCart);
router.put('/:id', cartControllers.updateCart);
router.get('/:id', cartControllers.getSingleRecipe)

module.exports = router;