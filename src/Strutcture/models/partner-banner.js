const { Schema, model } = require("mongoose");

module.exports = model(
    "partner-banner",
    new Schema({
        Guild: String,
        Message: String,
    })
)