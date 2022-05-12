const m = require("mongoose");

let Schema = new m.Schema({
    Guild: String,
    Toggle: Number
});

module.exports = m.model("lvlToggle", Schema);