const mongoose = require('mongoose');

const welcomeSys = mongoose.Schema({
    Guild: String,
    Channel: String,
    Background: String,
    Text: String
})

module.exports = mongoose.model("welcolme-system", welcomeSys)