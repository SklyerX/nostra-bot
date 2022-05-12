const mongoose = require('mongoose');

const warnSchema = mongoose.Schema({
    guildId: { type: String, required: true },
    userId: { type: String, required: true },
    warnings: { type: [Object], required: true },
    Reason: { type: [Object], required: true }
})

module.exports = mongoose.model('warned-user', warnSchema)