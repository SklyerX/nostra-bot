const Discord = require('discord.js');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
  name: "kiss",
  description: "kiss a user",
  options: [
      {
          name: "member",
          description: "The user that you want to kiss",
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
      .setTitle(`${interaction.user.username}, kissed 😏 ${user.tag}`)
      .setTimestamp()
      .setImage("https://images-ext-1.discordapp.net/external/AhfymYr3UsGp_rriu98rW_ZGDSfuF5McB2jV3PB5XVw/https/maki.gg/emote/kiss/3.gif?width=450&height=253")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed3 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, kissed 😏 ${user.tag}`)
      .setTimestamp()
      .setImage("https://images-ext-1.discordapp.net/external/owXbFRziyNVLaMA72pqMjQHGnhmtoRGx-VpfdWXOR5E/https/maki.gg/emote/kiss/49.gif?width=450&height=253")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed4 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, kissed 😏 ${user.tag}`)
      .setTimestamp()
      .setImage("https://images-ext-2.discordapp.net/external/FNf80pnQk-59U1TYs7RzJXNPUfjEbEDKygx2f91DBYM/https/maki.gg/emote/kiss/54.gif?width=450&height=270")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed5 = new Discord.MessageEmbed()
      .setTimestamp()
      .setImage("https://media3.giphy.com/media/FqBTvSNjNzeZG/giphy.gif")
      .setTitle(`${interaction.user.username}, kissed 😏 ${user.tag}`)
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

    let replies = [embed2, embed3, embed4, embed5]
    let randomhug = replies[Math.floor(Math.random() * replies.length)]

    interaction.reply({ embeds: [randomhug] })
  }
}