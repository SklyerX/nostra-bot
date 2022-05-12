const Discord = require('discord.js');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
  name: "poke",
  description: "poke someone",
  options: [
      {
          name: "member",
          description: "The user that you want to poke",
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
      .setTitle(`${interaction.user.username}, poked ${user.tag}`)
      .setTimestamp()
      .setImage("https://c.tenor.com/nRKOOicoT8YAAAAC/anime-poke.gif")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed3 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, poked ${user.tag}`)
      .setTimestamp()
      .setImage("https://c.tenor.com/1YMrMsCtxLQAAAAC/anime-poke.gif")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed4 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, poked ${user.tag}`)
      .setTimestamp()
      .setImage("https://media4.giphy.com/media/FdinyvXRa8zekBkcdK/giphy.gif")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed5 = new Discord.MessageEmbed()
      .setTimestamp()
      .setImage("https://i.gifer.com/FK0b.gif")
      .setTitle(`${interaction.user.username}, poked ${user.tag}`)
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

    let replies = [embed2, embed3, embed4, embed5]
    let randomhug = replies[Math.floor(Math.random() * replies.length)]

    interaction.reply({ embeds: [randomhug] })
  }
}