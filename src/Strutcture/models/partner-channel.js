const mongoose = require('mongoose');

const partnerCh = mongoose.Schema({
    Guild: String,
    Channel: String
});

module.exports = mongoose.model("partner-channel", partnerCh)