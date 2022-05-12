const client = require("../../index");
const config = require("../../../data/config.json").clientModes;

client.on("ready", async () => {
    if (config.updating.value === "true") {
        client.user.setPresence({ activities: [{ name: config.updating.status }], status: 'dnd' });
    } else if (config.changingStatus.value === true) {
        function ChangingStatus() {
            let clientStatus = [`${client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)} | ${prefix}invite`, `${client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)} | ${prefix}help`]
            let Power = Math.floor(Math.random() * clientStatus.length);
            client.user.setActivity(adrenalin[Power], { type: "LISTENING" });
        }; setInterval(ChangingStatus, 15000)
    }
})