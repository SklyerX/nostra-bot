const { CommandInteraction, MessageEmbed } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const { create } = require("sourcebin");

module.exports = {
    name: "bot-guilds",
    description: "Get the information on the bot's servers",
    dev: true,
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        let description =
          `Total Servers - ${client.guilds.cache.size}\n\n` +
          client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map(r => r)
            .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
            .slice(0, 10)
            .join("\n\n");
  
        
        const fs = require("fs");

        fs.writeFileSync(`servers.txt`, `${description}`)

        create([
          { 
              name: "Bot Guilds Found",
              content: description,
              language: "javascript"
          }
      ], {
          title: "Bot Guilds",
          description: "Here is the list of the bot guilds"
      }).then((value) => {
          interaction.reply({ embeds: [new MessageEmbed().setDescription(e.regular.yes +` | The information about the bot's guilds are posted at: ${value.url}`)
          .setColor(ee.color)
          .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })], ephemeral: true });
      })
    }
}