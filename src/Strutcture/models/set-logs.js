const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    Guild: String,
    Channel: String
})

module.exports = mongoose.model("logs", logSchema)