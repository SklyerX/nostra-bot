const channelI = require("../../../Strutcture/models/set-invite");
const channelL = require("../../../Strutcture/models/set-logs");
const channelB = require("../../../Strutcture/models/set-boost");

module.exports = {
    name: "channelDelete",
    once: false,
    async execute(channel) {
        // Invite
        try {
            channelI.findOne(
                {
                    Channel: channel.id,
                },
                async (err, data) => {
                    if (err) throw err;
                    if (!data) return;
                    data.delete();
                }
            );
        } catch (err) {
            console.log(err);
        }
        // logs
        try {
            channelL.findOne(
                {
                    Channel: channel.id,
                },
                async (err, data) => {
                    if (err) throw err;
                    if (!data) return;
                    data.delete();
                }
            );
        } catch (err) {
            console.log(err);
        }
        // Boost
        try {
            channelB.findOne(
                {
                    Channel: channel.id,
                },
                async (err, data) => {
                    if (err) throw err;
                    if (!data) return;
                    data.delete();
                }
            );
        } catch (err) {
            console.log(err);
        }
    }
}
