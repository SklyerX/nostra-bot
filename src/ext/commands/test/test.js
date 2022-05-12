const { CommandInteraction, MessageEmbed } = require("discord.js");
const Schema = require("../../../Strutcture/models/set-logs");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "test",
    description: "Set a channel to log every moderation / admin commands used in you're server!",
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const data = await Schema.findOne({ Guild: interaction.guild.id });
        if(!data) return;
        
        const channel = interaction.guild.channels.cache.get(data.Channel)
        
        interaction.reply("check <#" + channel.id + ">")
        channel.send("The modlogs works!")
    }
}