const { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");
const DB = require("../../../Strutcture/models/TicketSetup");

module.exports = {
    name: "ticket-setup",
    description: "setup you're ticket message!",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "channel",
            description: "Select the ticket channel were members are going to make the tickets.",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        },
        {
            name: "category",
            description: "Select where open tickets will go to.",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_CATEGORY"]
        },
        {
            name: "transcripts",
            description: "Select the transcripts channel were the chat logs will be set.",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        },
        {
            name: "handlers",
            description: "1",
            required: true,
            type: "ROLE"
        },
        {
            name: "everyone",
            description: "aawdaw",
            required: true,
            type: "ROLE",
        },
        {
            name: "description",
            description: "Set the description of the ticket creation channel.",
            required: true,
            type: "STRING",
        },
        {
            name: "button1",
            description: "2",
            type: "STRING",
            required: true,
        },
        {
            name: "button2",
            description: "3",
            type: "STRING",
            required: true,
        },
        {
            name: "button3",
            description: "3",
            type: "STRING",
            required: true,
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client)  {
        const { guild, options } = interaction;

        try {
            const Channel = options.getChannel("channel");
            const Category = options.getChannel("category");
            const Transcripts = options.getChannel("transcripts");
            const Handlers = options.getRole("handlers");
            const Everyone = options.getRole("everyone");

            const Description = options.getString("description");

            const Button1 = options.getString("button1").split(",");
            const Button2 = options.getString("button2").split(",");
            const Button3 = options.getString("button3").split(",");


            const Emoji1 = Button1[1];
            const Emoji2 = Button2[1];
            const Emoji3 = Button3[1];

            await DB.findOneAndUpdate(
                { GuildID: guild.id },
                {
                    Channel:
                        Channel.id,
                    Category:
                        Category.id,
                    Transcripts:
                        Transcripts.id,
                    Handlers: Handlers.id,
                    Everyone:
                        Everyone.id,
                    Description: Description,
                    Buttons: [Button1[0], Button2[0], Button3[0]]
                },
                {
                    new: true,
                    upsert: true
                });

            const Buttons = new MessageActionRow()
            Buttons.addComponents(
                new MessageButton()
                    .setCustomId(Button1[0])
                    .setLabel(Button1[0])
                    .setStyle("PRIMARY")
                    .setEmoji(Emoji1),

                new MessageButton()
                    .setCustomId(Button2[0])
                    .setLabel(Button2[0])
                    .setStyle("SECONDARY")
                    .setEmoji(Emoji2),

                new MessageButton()
                    .setCustomId(Button3[0])
                    .setLabel(Button3[0])
                    .setStyle("SUCCESS")
                    .setEmoji(Emoji3)
            );

            const Embed = new MessageEmbed()
            .setAuthor({ name: `${interaction.guild.name} | Ticket System`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setDescription(Description)
            .setColor("BLUE");

            await guild.channels.cache.get(Channel.id).send({ embeds: [Embed], components: [Buttons] });

            interaction.reply({ content: "Done" })
        } catch (err) {
            const errEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription("⛔ | AN error occured while setting you're ticket system\n**What you can do to help?**\n\n1. Make sure the button's names are duplicated\n2. Make sure you use this format for you're buttons => Name, Emoji\n3. Make sure you're button names do exceed 200 characters\n4. Make sure you're button emojis, are actually emojis, not ids");

            interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    },
};
