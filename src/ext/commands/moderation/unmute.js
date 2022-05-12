const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require("discord.js");
const Schema = require("../../../Strutcture/models/set-logs");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

module.exports = {
  name: "unmute",
  description: "unmute the mute user",
  clientPerms: ['MANAGE_ROLES'],
  userPerms: ['MANAGE_ROLES'],
  options: [
    {
      name: "member",
      description: "The member you wish to mute",
      required: true,
      type: "USER"
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {

    let a = new MessageButton()
                .setCustomId('accept')
                .setStyle('SECONDARY')
                .setEmoji(e.regular.yes)

            let b = new MessageButton()
                .setCustomId('decline')
                .setStyle('SECONDARY')
                .setEmoji(e.regular.no)

            let row = new MessageActionRow().addComponents(a, b)
            const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 30000 })

    try {
      const Member = interaction.options.getMember("member");
      const role = interaction.guild.roles.cache.find((role) => role.name === "Muted");

      if (!role) {
          await interaction.channel.send({ embeds: [
              new MessageEmbed()
              .setColor(ee.color)
              .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
              .setDescription(`${e.regular.no} | No mute role was found, you have to unmute this user manually. If you think this is a problem, please let the developers of the bot know.`)
          ]})
      } else {
          if (!Member.roles.cache.has(role.id))
            return await interaction.channel.send({
              embeds: [
                new MessageEmbed()
                  .setColor(ee.color)
                  .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                  .setDescription(`${e.regular.no} | This user is not muted!`)
              ]
            })

            await interaction.reply({ embeds: [new MessageEmbed()
              .setColor(ee.color)
              .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
              .setTitle('Are you sure?').setDescription(`Are you sure you want to unmute ${Member}?`).addFields({ name: 'Click the according emoji to confirm', value: `${e.regular.yes} To mute, ${e.regular.no} To cancel proccess` }).setColor(ee.color)], components: [row], ephemeral: true })
      
            collector.on('collect', async (m) => {
              if (m.customId === 'accept') {
                  try {
                      Member.send({ embeds: [new MessageEmbed().setColor(ee.color).addField("Server Name", `${interaction.guild.name}`).setTitle(`Unmuted In ${interaction.guild.name}`).setFooter({ text: ee.footerText, iconURL: ee.footerIcon })] })
                  } catch (err) {
                      console.log(`${Member.id} was unmuted in ${interaction.guild.name}. But I could not message them`)
                  }
      
                  // Muting the user
                  await Member.roles.remove(role);
                  await interaction.channel.send({
                    embeds: [
                      new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`${e.regular.yes} | Successfully unmuted <@${Member.id}>`)
                    ]
                  })
    
    
          const data = await Schema.findOne({ Guild: interaction.guild.id });
          if (data) {
              const channel = interaction.guild.channels.cache.get(data.Channel)
    
              channel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**Member:** <@${Member.id}> \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Member Unmuted")] })
          }
    
          a.setDisabled(true)
          b.setDisabled(true)
          row = new MessageActionRow().addComponents(a, b)
          m.update({ embeds: [new MessageEmbed().setTitle('Success').setDescription(`${e.regular.yes} | Unmuted ${Member}`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
    
      } else {
          a.setDisabled(true)
          b.setDisabled(true)
          m.update({ embeds: [new MessageEmbed().setTitle('Cancelled').setDescription(`${e.regular.yes} | Unmute process has been terminated`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
      }
    });
            
            
        }
        
        


    } catch (err) {
      return await interaction.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
            .setDescription(`${e.regular.no} | We ran into a problem while running this command! please try again later or let the developers know! \n\nError:\n\`\`\`${err}\`\`\``)
        ]
      })
    }
  },
};