const config = require("../../data/config.json");
const client = require("../index");

const hook = new WebhookClient({ id: config.webhook.backupId, token: config.webhook.backupToken });

client.on("disconnect", () => {
    hook.send(`<@${config.bot.ownerId}> \n \`\`\`js\n${client.user.tag} has been disconnected from discord.js\`\`\``)
});

client.on("rateLimit", async (limit) => {
    hook.send(`<@${config.bot.ownerId}> \n \`\`\`js\n${client.user.tag} is being rate limited\`\`\``)
    hook.send(`<@${config.bot.ownerId}> \n \`\`\`js\nLimit: ${limit.limit} \nMethod: ${limit.method} \nPath: ${limit.path} \nRoute: ${limit.route} \nTime Difference: ${limit.timeDifference} \nTimeout: ${limit.timeout} \`\`\``)
});