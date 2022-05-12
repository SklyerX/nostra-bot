const { Events } = require("../Strutcture/Validation/EventNames");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const { eventNames } = require("process");
const Table = new Ascii("Events Loaded");

module.exports = async(client) => {
    Table.setHeading("Event", "Load Status");
    (await PG(`${process.cwd()}/src/ext/Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name) || !eventNames.name) {
            const L = file.split("/");
            await Table.addRow(`${event.name || "Missing"}`, `⛔ Event name is either invalid or missing: ${L[6] + "/" + L[7]}`);
            return;
        }

        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        };

        await Table.addRow(event.name, "✅ Success");
    });

    console.log(Table.toString());
}