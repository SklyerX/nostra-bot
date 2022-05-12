const { CommandInteraction, MessageEmbed } = require("discord.js");
const Schema = require("../../../Strutcture/models/memberCount");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "server-statistics",
    description: "Setup the server member and bot statistics.",
    clientPerms: ["MANAGE_CHANNLES"],
    userPerms: ["MANAGE_CHANNLES"],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        Schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
            if(err) throw err;

            const channel = await interaction.guild.channels.create(`Members: ${interaction.guild.memberCount}`, {
                type: "GUILD_VOICE",
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["CONNECT"]
                    }
                ]
            });

            const botChannel = await interaction.guild.channels.create(`Bots: ${interaction.guild.members.cache.filter(m => m.user.bot).size}`, {
                type: "GUILD_VOICE",
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["CONNECT"]
                    }
                ]
            });

            new Schema({
                Guild: interaction.guild.id,
                Channel: channel.id,
                BotChannel: botChannel.id,
                Member: interaction.guild.memberCount,
                Bots: interaction.guild.members.cache.filter((m) => m.user.bot).size,
            }).save();
        })
    }
}