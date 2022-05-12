const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const fs = require("fs");
const config = require("../../../../data/config.json");
const version = require("../../../../package.json").version;

module.exports = {
    name: "help",
    description: "Help",
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const Embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setDescription(`The most all-in-one bot made to engage members and moderate your server and give it advanced security! Featuring server management, moderation, statistics, protection, anti raid, and more with upcoming updates!`)
            .addField("📃 Commands", "[Click Here](https://nostrabot.com/commands) for a full list of commands")
            .setAuthor({ name: "Nostra | Help", iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        const invite = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL(`${config.external.inv}`)
                    .setLabel(`Invite Nostra Bot`)
                    .setStyle('LINK')
            )
            .addComponents(
                new MessageButton()
                    .setURL(config.external.discord)
                    .setLabel(`Join Support Server`)
                    .setStyle('LINK')
            )
            // .addComponents(
            //     new MessageButton()
            //         .setURL(`${v.vote}`)
            //         .setLabel(`Vote OnlyNude Bot`)
            //         .setStyle('LINK')
            // )
            .addComponents(
                new MessageButton()
                    .setLabel(`Update Log !`)
                    .setCustomId('update')
                    .setStyle('DANGER'),
            )

        interaction.reply({ embeds: [Embed], components: [invite], ephemeral: true });

        const log = fs.readFileSync("updates.txt", "utf8");

        const update_log = new MessageEmbed()
            .setAuthor({ name: `Update Log • Current Version : ${version}` })
            .setDescription(`\`\`\`${log}\`\`\``)
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

        const filter1 = i => i.customId === 'update' && i.user.id === interaction.user.id;

        const collector1 = interaction.channel.createMessageComponentCollector({ filter1 });

        collector1.on('collect', async i => {
            if (i.customId === 'update') {
                await i.reply({ embeds: [update_log], ephemeral: true });
            }
        });
    }
}