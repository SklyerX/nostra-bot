const mongoose = require('mongoose');

const boostSchema = mongoose.Schema({
    Guild: String,
    Channel: String
})

module.exports = mongoose.model("boost-detection", boostSchema)