const { MessageEmbed } = require('discord.js');
const warnSchema = require('../../../Strutcture/models/warnDB');
const Schema = require('../../../Strutcture/models/set-logs');
const uuid = require('uuid');
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");


module.exports = {
    name: "warn",
    description: 'Warn a user, get a list of a user, and remove the warned user!',
    userPerms: ['KICK_MEMBERS', 'BAN_MEMBERS'],
    botPerms: ['KICK_MEMBERS', 'BAN_MEMBERS'],
    options: [
        {
            name: 'add',
            description: 'Warn a user!',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'Provide a user to warn them!',
                    type: 'USER',
                    required: true,
                },
                {
                    name: 'reason',
                    description: 'Provide a reason!',
                    type: 'STRING',
                    required: true,
                },
            ],
        },
        {
            name: 'list',
            description: 'Get a list of the warned user!',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: "Provide a user to get it's list",
                    type: 'USER',
                    required: true,
                },
            ],
        },
        {
            name: 'remove',
            description: 'Remove a warned user!',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'warnid',
                    description: 'Provide a warnID to remove the warned user!',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'user',
                    description: 'Provide a user to remove the warned user!',
                    type: 'USER',
                    required: true,
                },
            ],
        },
    ],

    async execute(interaction) {
        const subCommandName = interaction.options._subcommand;

        const user = interaction.options.getUser('user');
        const getWarnId = interaction.options.getString('warnid');

        switch (subCommandName) {
            case 'add':
                const getReason = interaction.options.getString('reason');

                const warnObj = {
                    authorId: interaction.user.id,
                    timestamp: Math.floor(Date.now() / 1000),
                    warnId: uuid.v4(),
                    reason: getReason,
                };

                const warnAddData = await warnSchema.findOneAndUpdate(
                    {
                        guildId: interaction.guild.id,
                        userId: user.id,
                    },
                    {
                        guildId: interaction.guild.id,
                        userId: user.id,
                        $push: {
                            warnings: warnObj,
                        },
                    },
                    {
                        upsert: true,
                    },
                );
                const warnCount = warnAddData ? warnAddData.warnings.length + 1 : 1;
                const warnGrammar = warnCount === 1 ? '' : 's';

                await interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                    .setDescription(`Warned **${user.tag}**, They now have **${warnCount}** warning${warnGrammar}`)
                ], ephemeral: true });

                const data = await Schema.findOne({ Guild: interaction.guild.id });
                if (data) {
                    const logs = interaction.guild.channels.cache.get(data.Channel)

                    logs.send({
                        embeds: [new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setTitle("Warn Added")
                            .setDescription(`**Member:** <@${user.id}> \n**Reason:** ${getReason} \n**Moderator:** <@${interaction.user.id}> \n**Warn Count:** ${warnCount}`)
                            .setTimestamp()
                        ]
                    });
                }

                break;

            case 'list':
                const warnedResult = await warnSchema.findOne({
                    guildId: interaction.guild.id,
                    userId: user.id,
                });

                if (!warnedResult || warnedResult.warnings.length === 0)
                    return await interaction.reply({
                        embeds: [new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`${e.regular.no} | This user has no warnings in our database`)
                        ],
                        ephemeral: true,
                    });

                let string = '';
                const embed = new MessageEmbed()
                    .setDescription(string)
                    .setColor(ee.color)
                    .setFooter({ text: ee.footerText, iconURL: ee.footerIcon });

                const getWarnedUser = interaction.guild.members.cache.find(
                    (user) => user.id === warnedResult.userId,
                );
                for (const warning of warnedResult.warnings) {
                    const { authorId, timestamp, warnId, reason } = warning;
                    const getModeratorUser = interaction.guild.members.cache.find(
                        (user) => user.id === authorId,
                    );
                    string += embed
                        .addField(
                            `Warn ID: ${warnId} | Moderator: ${getModeratorUser.user.tag} \nReason`,
                            `${reason} - <t:${timestamp}>`,
                        )
                        .setTitle(`${getWarnedUser.user.username}'s Warning Lists!`)
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon });
                }

                await interaction.reply({ embeds: [embed], ephemeral: true});
                break;

            case 'remove':
                const validateUUID = uuid.validate(getWarnId);

                if (validateUUID) {
                    const warnedRemoveData = await warnSchema.findOneAndUpdate(
                        {
                            guildId: interaction.guild.id,
                            userId: user.id,
                        },
                        {
                            $pull: { warnings: { warnId: `${getWarnId}` } },
                        },
                    );

                    const getRemovedWarnedUser = interaction.guild.members.cache.find(
                        (user) => user.id === warnedRemoveData.userId,
                    );

                    const warnedRemoveCount = warnedRemoveData
                        ? warnedRemoveData.warnings.length - 1
                        : 0;
                    const warnedRemoveGrammar = warnedRemoveCount === 1 ? '' : 's';

                    await interaction.reply({ embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                        .setDescription(`Successfully deleted **${getRemovedWarnedUser.user.tag}** warning, they now have **${warnedRemoveCount}** warning${warnedRemoveGrammar}!`)
                    ],
                    ephemeral: true
                    });

                const data = await Schema.findOne({ Guild: interaction.guild.id });
                if (data) {
                    const logs = interaction.guild.channels.cache.get(data.Channel)

                    logs.send({
                        embeds: [new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setTitle("Warn Removed")
                            .setDescription(`**Member:** <@${getRemovedWarnedUser.user.id}> \n**Moderator:** <@${interaction.user.id}> \n**Warn Count:** ${warnCount}`)
                            .setTimestamp()
                        ]
                    });
                }

                } else {
                    await interaction.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
                            .setDescription(`${e.regular.no} | The warn ID stated is not valid`)
                        ],
                        content: 'That is not a valid Warn ID!',
                        ephemeral: true,
                    });
                }

                break;
        }
    }
};
