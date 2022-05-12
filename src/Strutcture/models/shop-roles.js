const { Schema, model } = require("mongoose");

const shopRoles = new Schema({
    Guild: String,
    Roles: Array,
    Price: String,
});

module.exports = model("shop-roles", shopRoles);