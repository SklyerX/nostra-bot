const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({ intents: 32767, partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const { SpotifyPlugin } = require("@distube/spotify");
const antiCrash = require("./other/types/antiCrash");
const { DisTube } = require("distube");
const mongoose = require("mongoose");
const chalk = require("chalk");

module.exports = client;

mongoose.connect(config.bot.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () =>
    console.log(
        chalk.cyan("[ INFORMATION ]") +
        chalk.white.bold(" | ") +
        chalk.blue(`${new Date().toLocaleDateString()}`) +
        chalk.white.bold(" | ") +
        chalk.cyan("Mongo DB Connection") +
        chalk.white(": ") +
        chalk.greenBright(`Connected`)
    )
);
mongoose.connection.on("disconnected", () =>
    console.log(
        chalk.cyan("[ INFORMATION ]") +
        chalk.white.bold(" | ") +
        chalk.blue(`${new Date().toLocaleDateString()}`) +
        chalk.white.bold(" | ") +
        chalk.cyan("Mongo DB Connection") +
        chalk.white(": ") +
        chalk.greenBright(`Disconnected`)
    )
);
mongoose.connection.on("error", (error) =>
    console.log(
        chalk.cyan("[ INFORMATION ]") +
        chalk.white.bold(" | ") +
        chalk.blue(`${new Date().toLocaleDateString()}`) +
        chalk.white.bold(" | ") +
        chalk.cyan("Mongo DB Connection") +
        chalk.white(": ") +
        chalk.redBright(`Error`) +
        "\n" +
        chalk.white(`${error}`)
    )
);

client.commands = new Collection();
client.filters = new Collection();
client.filtersLog = new Collection();
client.distube = new DisTube(client, {
    emitAddSongWhenCreatingQueue: false,
    emitNewSongOnly: true,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    plugins: [new SpotifyPlugin()]
});

require("./Strutcture/System/GiveawaySys")(client);
require("./Strutcture/System/AntiTokenSys")(client);
require("./handlers/Events")(client);
require("./handlers/Commands")(client);

client.login(config.bot.token);

const Schema = require("./Strutcture/models/set-invite");
const InvitesTracker = require("@androz2091/discord-invites-tracker");
const tracker = InvitesTracker.init(client, {
    fetchGuilds: true,
    fetchVanity: true,
    fetchAuditLogs: true,
});

tracker.on("guildMemberAdd", async (member, type, invite) => {
    const data = await Schema.findOne({ Guild: member.guild.id });

    if (!data) return;
    const channel = member.guild.channels.cache.get(data.Channel);

    if (type === "normal") {
        channel.send(`Welcome ${member}! You were invited by ${invite.inviter} and He has ${invite.uses} Invites [invite link](${invite.url})`);
    } else if (type === "permissions") {
        channel.send(
            `Welcome ${member}! I can't figure out how you joined because I don't have the "MANAGE_GUILD" permission!`
        );
    } else if (type === "unknown") {
        channel.send(
            `Welcome ${member}! I can't figure out how you joined the server...`
        );
    } else if (type === "vanity") {
        channel.send(`Welcome ${member}! You joined using a custom invite Vanity URL !`);
    }
});

antiCrash();