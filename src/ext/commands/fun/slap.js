const Discord = require('discord.js');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
  name: "slap",
  description: "Slap a user",
  options: [
      {
          name: "member",
          description: "The user that you want slap",
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
      .setTitle(`${interaction.user.username}, slapped ${user.tag}`)
      .setTimestamp()
      .setImage("https://media4.giphy.com/media/Vf39XQd9eS9YlZdwWo/200.gif")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed3 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, slapped ${user.tag}`)
      .setTimestamp()
      .setImage("https://media0.giphy.com/media/l4hLNIEiVwGoooU7K/giphy.gif")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed4 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, slapped ${user.tag}`)
      .setTimestamp()
      .setImage("https://c.tenor.com/fw6gs_ia_UIAAAAC/slap-slapping.gif")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed5 = new Discord.MessageEmbed()
      .setTimestamp()
      .setImage("https://i0.wp.com/londonkoreanlinks.net/wp-content/uploads/2014/07/output_p3YU5C.gif?fit=500%2C281&ssl=1")
      .setTitle(`${interaction.user.username}, slapped ${user.tag}`)
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

    let replies = [embed2, embed3, embed4, embed5]
    let randomhug = replies[Math.floor(Math.random() * replies.length)]

    interaction.reply({ embeds: [randomhug] })
  }
}