const { CommandInteraction, MessageEmbed } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const fs = require("fs");
const e = require("../../../../data/emojis.json");

module.exports = {
    name: "updates",
    description: "See the possible updates that might come to the bot and view the previous changes",
    /**
     * @param {CommandInteraction} interaction
     */
    execute(interaction) {
        const updates = fs.readFileSync("updates.txt");
        const Embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setDescription(`\`\`\`${updates}\`\`\``)

        interaction.reply({ embeds: [Embed], ephemeral: true })
    }
}