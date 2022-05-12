const Discord = require('discord.js');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
  name: "highfive",
  description: "Highfive someone",
  options: [
      {
          name: "member",
          description: "The user that you want to highfive",
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
      .setTitle(`${interaction.user.username}, gave ${user.tag} a highfive`)
      .setTimestamp()
      .setImage("https://images-ext-1.discordapp.net/external/rQe-fNacrdQiqTj3JaWUppG7Bk20h9bNOTa-uQF_2Q8/https/maki.gg/emote/highfive/24.gif?width=450&height=270")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed3 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, gave ${user.tag} a highfive`)
      .setTimestamp()
      .setImage("https://acegif.com/wp-content/gif/high-five-83.gif")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed4 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, gave ${user.tag} a highfive`)
      .setTimestamp()
      .setImage("https://images-ext-2.discordapp.net/external/fmmg61V7QA-7skpm7lu3aJJWFlE7RuZxKcSQUzSEiYE/https/maki.gg/emote/highfive/26.gif?width=540&height=304")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed5 = new Discord.MessageEmbed()
      .setTimestamp()
      .setImage("https://images-ext-2.discordapp.net/external/flXRttZjGaOEWsLKTaH25ta_Sz303z6Sp_6RoGDLRRk/https/maki.gg/emote/highfive/7.gif?width=450&height=254")
      .setTitle(`${interaction.user.username}, gave ${user.tag} a highfive`)
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

    let replies = [embed2, embed3, embed4, embed5]
    let randomhug = replies[Math.floor(Math.random() * replies.length)]

    interaction.reply({ embeds: [randomhug] })
  }
}