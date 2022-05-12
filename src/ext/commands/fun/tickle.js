const Discord = require('discord.js');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
  name: "tickle",
  description: "Tickle someone",
  options: [
      {
          name: "member",
          description: "The user that you want to tickle",
          required: true,
          type: "USER"
      }
  ],
/**
 * @param {Discord.CommandInteraction} interaction
 */
  async execute(interaction) {
    const user = interaction.options.getUser("member");

    let embed2 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, tickled ${user.tag}`)
      .setTimestamp()
      .setImage("https://c.tenor.com/sa1QuA9GFaoAAAAC/anime-tickle.gif")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed3 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, tickled ${user.tag}`)
      .setTimestamp()
      .setImage("https://c.tenor.com/L5-ABrIwrksAAAAC/tickle-anime.gif")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed4 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, tickled ${user.tag}`)
      .setTimestamp()
      .setImage("https://c.tenor.com/PXL1ONAO9CEAAAAC/tickle-laugh.gif")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed5 = new Discord.MessageEmbed()
      .setTimestamp()
      .setImage("https://images-ext-1.discordapp.net/external/ONCJmGv8matrDMiZFWAXPqkYv5N-oIDkwW85nVVCDKo/https/maki.gg/emote/tickle/10.gif?width=317&height=178")
      .setTitle(`${interaction.user.username}, tickled ${user.tag}`)
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

    let replies = [embed2, embed3, embed4, embed5]
    let randomhug = replies[Math.floor(Math.random() * replies.length)]

    interaction.reply({ embeds: [randomhug] })
  }
}