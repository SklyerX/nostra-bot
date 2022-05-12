const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require('discord.js')
const Schema = require("../../../Strutcture/models/set-logs");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
  name: "remake",
  description: "Remake a channel, keep the same permissions but remove all the messages in it.",
  clientPerms: ["MANAGE_CHANNELS"],
  userPerms: ["MANAGE_CHANNLES"],
  options: [
    {
      name: "channel",
      description: "the channel you want to remake",
      required: true,
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"]
    },
    {
      name: "reason",
      description: "The reason you want to remake this channel",
      type: "STRING",
      required: false,
    }
  ],
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    let reason = interaction.options.getString("reason");

    let a = new MessageButton()
      .setCustomId('accept')
      .setStyle("SECONDARY")
      .setEmoji(e.regular.yes)

    let b = new MessageButton()
      .setCustomId('decline')
      .setStyle("SECONDARY")
      .setEmoji(e.regular.no)

    let row = new MessageActionRow().addComponents(a, b)
    const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 30000 });
    
    await interaction.reply({
      embeds: [new MessageEmbed().setDescription(`**Are You Sure U Want To Remake This Channel?** \n **All Message Data Will Be Lost If Nuked** \n\n ${e.regular.yes} To Confirm | ${e.regular.no} To Cancel`)
        .setColor(ee.color)
        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })], components: [row],
      ephemeral: true
    })

    collector.on('collect', async (m) => {
      if (m.customId === 'accept') {

        let newChannel = await channel.clone();

        await channel.delete();

        let embed = new MessageEmbed()
          .setTitle("Channel Remade")
          .setDescription(`**Channel Name:** ${channel.name} \n**Reason:** ${reason} \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`)
          .setColor(ee.color)
          .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })

        await newChannel.send({
          embeds: [new MessageEmbed().setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setDescription(`${e.regular.refresh} | This channel was remade by <@${interaction.user.id}>`)
            .setTitle("Channel Remade")]
        })

        const data = await Schema.findOne({ Guild: interaction.guild.id });
        if (data) {
          const logs = interaction.guild.channels.cache.get(data.Channel)

          logs.send({ embeds: [embed] })
        }
      }

      if (m.customId === 'decline') {
        a.setDisabled(true);
        b.setDisabled(true);
        m.update({ embeds: [new MessageEmbed().setTitle('Cancelled').setDescription(`${e.regular.yes} | Channel-Remaking process has been terminated`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
      }
    })
  }
}