const m = require("mongoose");

let Schema = new m.Schema({
    Guild: String,
    Cmds: Array
});

module.exports = m.model("slashCommands", Schema);