const { model, Schema } = require("mongoose");

module.exports = model("Afk", new Schema({
    GuildID: String,
    UserID: String,
    Status: String,
    Time: String
}))