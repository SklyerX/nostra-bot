const { Schema, model } = require("mongoose");

const reactionRoles = new Schema({
    Guild: String,
    Roles: Array
});

module.exports = model("reaction-roles", reactionRoles);