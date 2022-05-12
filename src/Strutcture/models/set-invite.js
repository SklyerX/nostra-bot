const mongoose = require('mongoose');

const inviteSchema = mongoose.Schema({
    Guild: String,
    Channel: String
})

module.exports = mongoose.model("invite-channel", inviteSchema)