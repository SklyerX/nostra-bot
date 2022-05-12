const Discord = require('discord.js');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
  name: "pat",
  description: "Give someone a pat.",
  options: [
      {
          name: "member",
          description: "The user that you want to pat",
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
      .setTitle(`${interaction.user.username}, patted ${user.tag}`)
      .setTimestamp()
      .setImage("https://media0.giphy.com/media/5tmRHwTlHAA9WkVxTU/giphy.gif")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed3 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, patted ${user.tag}`)
      .setTimestamp()
      .setImage("https://media1.giphy.com/media/M3a51DMeWvYUo/200.gif")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed4 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, patted ${user.tag}`)
      .setTimestamp()
      .setImage("https://i.gifer.com/KJ42.gif")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed5 = new Discord.MessageEmbed()
      .setTimestamp()
      .setImage("https://i.pinimg.com/originals/f9/48/23/f9482362de0673b378cbf74c6c7426e1.gif")
      .setTitle(`${interaction.user.username}, patted ${user.tag}`)
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

    let replies = [embed2, embed3, embed4, embed5]
    let randomhug = replies[Math.floor(Math.random() * replies.length)]

    interaction.reply({ embeds: [randomhug] })
  }
}