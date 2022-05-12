const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require("discord.js");
const Schema = require("../../../Strutcture/models/set-logs");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");
const marvalx = require("marvalx");
const d = require("../../../../data/punishmentIds.json");

module.exports = {
  name: "mute",
  description: "mute a member for the time specified",
  clientPerms: ['MANAGE_ROLES'],
  userPerms: ['MANAGE_ROLES'],
  options: [
    {
      name: "member",
      description: "The member you wish to mute",
      required: true,
      type: "USER"
    },
    {
      name: "duration",
      description: "The duration of the mute",
      required: true,
      type: "STRING"
    },
    {
      name: "reason",
      description: "the reason for the mute",
      required: false,
      type: "STRING"
    }
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
      const time = interaction.options.getString("duration");
      const role = interaction.guild.roles.cache.find((role) => role.name === "Muted");
      let Reason = interaction.options.getString("reason");

      if(!Reason) Reason = "No reason specified";

      if (!role) {
        try {
          interaction.channel.send({
            embeds: [
              new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                .setDescription(`${e.regular.loading} | No mute role found attempting to create one!`)
            ]
          })

          let muterole = await interaction.guild.roles.create({
            name: "Muted",
            color: "RED",
            permissions: [],
          });
          interaction.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").forEach(async (channel, id) => {
            await channel.permissionOverwrites.edit(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
            });
          });
          interaction.channel.send({
            embeds: [
              new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                .setDescription(`${e.regular.yes} | Successfully created the mute role`)
            ]
          })
        } catch (error) {
          console.log(error);
        }
      }
      let role2 = interaction.guild.roles.cache.find(
        (r) => r.name === "Muted"
      );
      if (Member.roles.cache.has(role2.id))
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
              .setDescription(`${e.regular.no} | This user is already muted!`)
          ],
          ephemeral: true
        })



      interaction.reply({ embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
        .setTitle('Are you sure?').setDescription(`Are you sure you want to mute ${Member} for ${Reason} ?`).addFields({ name: 'Click the according emoji to confirm', value: `${e.regular.yes} To mute, ${e.regular.no} To cancel proccess` }).setColor(ee.color)], components: [row], ephemeral: true })

      collector.on('collect', async (m) => {
        if (m.customId === 'accept') {
            try {
                Member.send({ embeds: [new MessageEmbed().setColor(ee.color).addField("Server Name", `${interaction.guild.name}`).addField("Duration", `${time}`).addField("Reason", `${Reason}`).addField("Punishment ID", `${d.muteId}`).setTitle(`Muted In ${interaction.guild.name}`).setFooter({ text: ee.footerText, iconURL: ee.footerIcon })] })
            } catch (err) {
                console.log(`${Member.id} was muted in ${interaction.guild.name}. But I could not message them`)
            }




            // Muting the user
            await Member.roles.add(role2);
            interaction.channel.send({
              embeds: [
                new MessageEmbed()
                  .setColor(ee.color)
                  .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                  .setDescription(`${e.regular.yes} | Successfully muted <@${Member.id}>`)
              ]
            })
        
            setTimeout(async () => {
              if (!Member.roles.cache.has(role2.id)) return;
              await Member.roles.remove(role2);
        
              Member.send({ embeds: [new MessageEmbed().setColor(ee.color).addField("Server Name", `${interaction.guild.name}`).setTitle(`Unmuted In ${interaction.guild.name}`).setFooter({ text: ee.footerText, iconURL: ee.footerIcon })] })

              interaction.channel.send({
                embeds: [
                  new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .setDescription(`${e.regular.yes} | Successfully unmuted <@${Member.id}> after \`${marvalx(time) / 1000}\``)
                ]
              })
        
            }, marvalx(time));

            // Muting the user


            const data = await Schema.findOne({ Guild: interaction.guild.id });
            if (data) {
                const channel = interaction.guild.channels.cache.get(data.Channel)

                channel.send({ embeds: [new MessageEmbed().setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setDescription(`**Member:** <@${Member.id}> \n**Duration:** ${time}\n**Reason:** ${Reason} \n**Moderator:** <@${interaction.user.id}> (${interaction.user.id})`).setTitle("Member Muted")] })
            }
 
            a.setDisabled(true)
            b.setDisabled(true)
            row = new MessageActionRow().addComponents(a, b)
            m.update({ embeds: [new MessageEmbed().setTitle('Success').setDescription(`${e.regular.yes} | Muted ${Member} for **${Reason}**`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })

        } else {
            a.setDisabled(true)
            b.setDisabled(true)
            m.update({ embeds: [new MessageEmbed().setTitle('Cancelled').setDescription(`${e.regular.yes} | Mute process has been terminated`).setColor(ee.color).setFooter({ text: ee.footerText, iconURL: ee.footerIcon }).setTimestamp()], components: [row] })
        }
    });



    } catch (err) {
      return interaction.channel.send({
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