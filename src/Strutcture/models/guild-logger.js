const mongoose = require('mongoose');

const guildLogger = mongoose.Schema({
    Guild: String,
    Channel: String
})

module.exports = mongoose.model("guild-logger", guildLogger)