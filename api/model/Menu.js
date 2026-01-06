const mongoose = require('mongoose');
const {Schema} = mongoose;

//create schema object for Menu Item

const menuSchema = new Schema ({
    name: {
        type: String,
        trim : true,
        required : true,
        minlength: 3
    },
    recipe: String,
    image: String,
    category: String,
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//create model
const Menu = mongoose.model("Menu", menuSchema);
// console.log(Menu.findById("642c155b2c4774f05c36eeb5"))
module.exports = Menu;