const express = require("express");
//const Menu = require("../model/Menu.js");
const router = express.Router();


const menuController = require('../controllers/menuController');
// get all menu items from database
router.get('/', menuController.getAllMenuItems)

// post a menu item
router.post('/', menuController.postMenuItem )

//delete a menu item
router.delete('/:id', menuController.deleteMenuItem )

//get a single menu item
router.get('/:id', menuController.singleMenuItem )

//update a single menu item
router.patch('/:id', menuController.updateMenuItem )
module.exports = router;