const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { antijoin } = require("../../Collections/index");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    ...new SlashCommandBuilder()
        .setName('anti-join')
        .setDescription('Set Guild Anti Raid Config')
        .addStringOption(option =>
            option.setName('config')
                .setDescription('Type Of Config')
                .setRequired(true)
                .addChoice('Anti Join', 'antijoin')
        )
        .addStringOption(option =>
            option.setName('value')
                .setDescription('ON/OFF')
                .setRequired(true)
                .addChoice('ON', 'ON')
                .addChoice('OFF', 'OFF')
        ),
    clientPerms: ["KICK_MEMBERS"],
    userPerms: ["ADMINISTRATOR"],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        var config = interaction.options.get('config').value;
        var value = interaction.options.get('value').value;
        var collection = antijoin.get(interaction.guild.id);


        if (config === 'antijoin') {
            if (value === 'ON') {
                if (collection) return interaction.channel.send({ content: "Anti join is already enabled" });
                antijoin.set(interaction.guild.id, []);
                await interaction.reply({ content: "Antijoin system is now on" })
            }
            if (value === 'OFF') {
                if (!collection) return interaction.channel.send({ content: "Anti join is already disabled" });
                antijoin.delete(interaction.guild.id);
                await interaction.reply({ content: "Antijoin system is now off" })
            }
        }

    }
}