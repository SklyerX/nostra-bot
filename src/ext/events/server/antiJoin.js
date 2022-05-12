const { MessageEmbed } = require("discord.js");
const DB = require("../../../Strutcture/models/AfkSystem");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const { antijoin } = require("../../Collections");

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {Message} message
     */
    async execute(member) {
        const collection = antijoin.get(member.guild.id);
        if(collection) {
            collection.push(member.user);
            if(!collection.includes((value) => value.id === member.user )) {
                collection.push(member.user)
            }
            try {
                member.send({ content: 'we are on lockdown please try to join another time'})
            } catch (e) {
                console.log("antijoin - User dms are blocked")
            }
            try {
                member.kick({ reason: "Antijoin protocol was activated" });
            } catch (e) {
                console.log(e);
            }
        }
    }
}