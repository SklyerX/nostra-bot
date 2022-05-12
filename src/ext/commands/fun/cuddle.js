const Discord = require('discord.js');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
  name: "cuddle",
  description: "cuddle a user",
  options: [
      {
          name: "member",
          description: "The user that you want to cuddle",
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
      .setTitle(`${interaction.user.username}, cuddled 🥺 ${user.tag}`)
      .setTimestamp()
      .setImage("https://images-ext-2.discordapp.net/external/5XT1BiuMM52svGe31Ndzgb-0Cvl2IKbSkoEXxr3lqS4/https/maki.gg/emote/cuddle/23.gif?width=450&height=253")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed3 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, cuddled 🥺 ${user.tag}`)
      .setTimestamp()
      .setImage("https://images-ext-1.discordapp.net/external/ZHevu9MSslItCS52jgevGgsEeow8GORLNvsGrwghr2M/https/maki.gg/emote/cuddle/3.gif?width=396&height=297")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed4 = new Discord.MessageEmbed()
      .setTitle(`${interaction.user.username}, cuddled 🥺 ${user.tag}`)
      .setTimestamp()
      .setImage("https://images-ext-1.discordapp.net/external/8mkY810B8JOgxfkGX2j3NdFcPRioR_C1Qd1MjZlhRlo/https/maki.gg/emote/cuddle/5.gif?width=450&height=252")
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
    let embed5 = new Discord.MessageEmbed()
      .setTimestamp()
      .setImage("https://64.media.tumblr.com/134e64d701fd9e0da2733d632fd5abfd/tumblr_olwch3aU8I1uvpisco1_500.gifv")
      .setTitle(`${interaction.user.username}, cuddled 🥺 ${user.tag}`)
      .setColor(ee.color)
      .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

    let replies = [embed2, embed3, embed4, embed5]
    let randomhug = replies[Math.floor(Math.random() * replies.length)]

    interaction.reply({ embeds: [randomhug] })
  }
}