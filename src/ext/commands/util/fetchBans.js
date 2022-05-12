const { CommandInteraction, MessageEmbed } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "fetch-bans",
    description: "get the bans of the server",
    userPerms: ["BAN_MEMBERS"],
    clientPerms: ["BAN_MEMBERS"],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {

        const fetchedBans = interaction.guild.bans.fetch()
        const bannedMembers = (await fetchedBans).map((member) => member.user.tag +  `${member.user.id}`).join(", ");

        interaction.reply({ embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setDescription(bannedMembers)
            .setTitle("Ban List")
        ], ephemeral: true })
    }
}