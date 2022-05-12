const Discord = require('discord.js');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
  name: "hug",
  description: "Give a user a hug.",
  options: [
      {
          name: "member",
          description: "The user that you want to give a hug to",
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
      .setTitle(`${interaction.user.username}, hugs ${user.tag}`)
      .setTimestamp()
      .setImage("https://cdn.weeb.sh/images/HytoudXwW.gif")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed3 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, hugs ${user.tag}`)
      .setTimestamp()
      .setImage("https://cdn.weeb.sh/images/BJ0UovdUM.gif")
    let embed4 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, hugs ${user.tag}`)
      .setTimestamp()
      .setImage("https://cdn.weeb.sh/images/rJaog0FtZ.gif")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed5 = new Discord.MessageEmbed()
      .setTimestamp()
      .setImage("https://cdn.weeb.sh/images/BJCCd_7Pb.gif")
      .setTitle(`${interaction.user.username}, hugs ${user.tag}`)
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

    let replies = [embed2, embed3, embed4, embed5]
    let randomhug = replies[Math.floor(Math.random() * replies.length)]

    interaction.reply({ embeds: [randomhug] })
  }
}