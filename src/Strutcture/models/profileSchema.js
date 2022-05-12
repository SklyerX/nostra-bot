const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },
    serverID: { type: String, required: true },
    nosCoins: { type: Number, default: 500 },
    bank: { type: Number }
})

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;
