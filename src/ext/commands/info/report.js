const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const config = require("../../../../data/config.json").channels;
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "bug",
    description: "Report A Bug that is found in Nostra Bot (you will get a reward if the bot is valid)",
    options: [
        {
            name: "bug",
            description: "The bot's bug that you want to remove",
            required: true,
            type: "STRING",
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        interaction.channel.createInvite({ temporary: false, maxAge: 0, maxUses: 0, reason: `Invite Created For The Developer To Give The Reporter A Prize`}).then((inviteCode) => {
            const Embed = new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                .addField("Reported By", `<@${interaction.user.id}> (${interaction.user.id})`)
                .addField("Reported In", `${interaction.guild.name} (${interaction.guild.id})`)
                .addField("Invite Link", `[Link To Server](${inviteCode})`)
                .addField("Message Link", `[Message Link](https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${interaction.id})`);

                client.channels.cache.get(config.bugReport).send({ content: `<@805166992432431124>`, embeds: [Embed] })
        })

        interaction.reply({ embeds: [
            new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setDescription(`${e.regular.yes} | Thanks for reporting this bug! If this bug is valid you will recive a reward from the developers so keep look on you're dms!`)
        ], ephemeral: true })
    }
}