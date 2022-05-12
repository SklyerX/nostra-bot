const { model, Schema } = require("mongoose");

module.exports = model("Ticketsetup", new Schema({
    GuildID: String,
    Channel: String,
    Category: String,
    Transcripts: String,
    Handlers: String,
    Everyone: String,
    Description: String,
    Buttons: [String],
}))