const { model, Schema } = require("mongoose");

let enCryptedGuild = new Schema({
    Guild : String,
    Key : String
})

module.exports = model('server-key', enCryptedGuild)