const { WebhookClient } = require("discord.js");
const config = require("../../../data/config.json");

const hook = new WebhookClient({ id: config.webhook.webhookId, token: config.webhook.webhookToken });

function antiCrash() {
  process.on('unhandledRejection', (error) => {
    hook.send(`<@${config.bot.ownerId}> \n \`\`\`js\n${error.stack}\`\`\``)
  });
  process.on("uncaughtException", (err, origin) => {
    hook.send(`<@${config.bot.ownerId}> \n \`\`\`js\n${err.stack}\`\`\``)
  })
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    hook.send(`<@${config.bot.ownerId}> \n \`\`\`js\n${err.stack}\`\`\``)
  });
  process.on('beforeExit', (code) => {
    hook.send(`<@${config.bot.ownerId}> \n \`\`\`js\n${code}\`\`\``)
  });
  process.on('exit', (code) => {
    hook.send(`<@${config.bot.ownerId}> \n \`\`\`js\n${code}\`\`\``)
  });
  process.on('multipleResolves', (type, promise, reason) => {
  });
}

module.exports = antiCrash;