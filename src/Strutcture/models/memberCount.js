const { Schema, model } = require("mongoose");

module.exports = model(
    "member-count",
    new Schema({
        Guild: String,
        Channel: String,
        BotChannel: String,
        Member: String,
        Bots: String,
    })
)