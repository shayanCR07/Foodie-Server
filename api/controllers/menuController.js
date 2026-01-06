//const { default: useAxiosSecure } = require("../../../foodie_client/src/hooks/useAxiosSecure");
const mongoose = require("mongoose");
const Menu = require("../model/Menu");

const getAllMenuItems = async (req, res) => {
  try {
    const menus = await Menu.find({}).sort({ createdAt: -1 });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// post a new menu item
const postMenuItem = async (req, res) => {
  const newItem = req.body;
  try {
    const result = await Menu.create(newItem);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// delete a menu item
const deleteMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(menuId)) {
      return res.status(400).json({ message: "Invalid menu ID" });
    }
    const deletedItem = await Menu.findByIdAndDelete(menuId);
    console.log(deletedItem);
    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu Item deleted successfully!!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get single menu item
// const singleMenuItem = async (req, res) => {
//   try {
//     const menuId = req.params.id;
//     console.log("single",menuId);
//     const menu = await Menu.findOne({_id: String(menuId)});
//     console.log("========");
//     console.log(menu);
//     console.log("========");
//     if (!menu) {
//       return res.status(404).json({ message: "Menu item not found" });
//     }

//     res.status(200).json(menu);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const singleMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid menu ID" });
    }

    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//update a single menu item
// const updateMenuItem = async (req, res) => {
//   const menuId = req.params.id;
//   const { name, recipe, image, category, price } = req.body;
//   try {
//     const updatedItem = await Menu.findByIdAndUpdate(
//       menuId,
//       { name, recipe, image, category, price },
//       { new: true, runValidators: true }
//     );

//     if (!updatedItem) {
//       return res.status(404).json(`Menu not found`);
//     }
//     res.status(200).json(updatedItem);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid menu ID" });
    }

    const updatedItem = await Menu.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMenuItems,
  postMenuItem,
  deleteMenuItem,
  singleMenuItem,
  updateMenuItem,
};
