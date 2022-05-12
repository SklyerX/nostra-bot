const { CommandInteraction, MessageEmbed } = require("discord.js");
const ee = require("../../../../data/embeds.json");
const e = require("../../../../data/emojis.json");

let ips = [
  '14.621.152.163.87.5',
  '96.492.139.149.12.8',
  '84.424.522.985.24.1',
  '82.245.242.874.83.13',
  '91.532.981.149.25.1',
  '24.123.091.134.24.4',
  '82.244.251.142.15.9',
  '21.981.847.109.12.3',
  '69.420.360.360.21.9',
  '87.242.081.018.24.6'
];

let passwords = [
  'idiotsandwich12345',
  'noobgaedumass360',
  'imadoptedlolololololololol',
  'reconispogiwannamarryhim',
  'joemamaurmama',
  'yesisyesyesimnub',
  '12345',
  'abcdef',
  'ilikecoconut12345',
  'penpinapplepinapplepen',
  'sussyimposter541'
];


let emails = [
  `sucks@gmail.com`,
  `isdumbdumb@gmail.com`,
  `@yahoo.com`,
  `@isdumb.io`,
  `@noob.com`,
  `idiot@noob.net`,
  `gae@wannabe.com`,
  `hacked@noob.com`,
  `artifical.intelegance@bot.com`,
  `getgood@ha.xyz`,
  `nub.nub@nub.nub`,
  `yes.no@yesnt.exe`,
  `obama@prism.old`,
  `joe@bidome.new`,
  `badpickup@line.tinder`,
  `dogwater@yes.com`
];


let ccis = [
  '5430112115445621',
  '9283109176382620',
  '1384378743864386',
  '2473897583563753',
  '3978564875648756',
  '4878567578565787',
  '8573647365736573',
  '7756542654265426',
  '6789768976789878',
  '6942021360420699',
  '9874899483648346',
  '0876578976374634',
  '7374826537265742',
  '942i758265487562',
  '1432874628746328',
  '9876546789098765',
  '8765678908765467',
  '6784932483724232',
  '7867524725278527',
  '8765456789876545',
  '3647284257425423',
];


let names = [
  'Josh',
  'Ronald',
  'Joe',
  'Liam',
  'Noah',
  'Oliver',
  'Henry',
  'James',
  'Alexander',
  'Hugh jass',
  'Mike croch',
  'Liam',
  'Aria',
  'Daniel',
  'Sebastian',
  'Gabriel',
  'Jacob',
  'Elias',
  'Matthew',
  'Diamond',
  'Peter'
]


module.exports = {
  name: "hack",
  description: "hack a user",
  options: [
      {
          name: "member",
          description: "The member that you want to hack",
          required: true,
          type: "USER"
      }
  ],
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {

    const email = emails[Math.floor(Math.random() * emails.length)];


    const password = passwords[Math.floor(Math.random() * passwords.length)];


    const ip = ips[Math.floor(Math.random() * ips.length)];


    const cci = ccis[Math.floor(Math.random() * ccis.length)];


    const name = names[Math.floor(Math.random() * names.length)];

    let user = interaction.options.getUser("member");

    let text = [

      `**Getting \`${user.username}'s\` real name**`,

      `**\`${user.username}'s\` real name : ${name}**`,

      `**Downloading SYNAPSE X** `,

      `**Checking \`${user.username}'s\` Discord Account**`,

      `**\`${user.username}'s\` Email : ${user.username}${email}**`,

      `**\`${user.username}'s\` password : ${password}**`,

      ` **\`${user.username}'s\` Ip : ${ip}**`,

      ` **Checking \`${user.username}'s\` bank account **`,

      `**\`${user.username}'s\` credit card number : ${cci}**`,

    ];

    let current = 0;
    let count = text.length;
    let editTime = 2000;

    if(user.id === interaction.user.id) return interaction.reply({
        embeds: [
            new MessageEmbed()
                .setDescription(`${e.regular.no} | You cannot hack yourself.`)
                .setColor(ee.color)
                .setFooter({ text: ee.footerText, iconURL: ee.footerIcon })
        ],
        ephemeral: true
    })

    interaction.channel.send(`**Hacking \`${user.username}\`**`).then((msg) => {

      let interval = setInterval(() => {

        if (current === count) {
          msg.edit(`**The totally legit and dangerous hack is complete** 🤡 `);
          clearInterval(interval);
          return;
        }

        let hackMsg = text[current];
        msg.edit(hackMsg);
        current++

      }, editTime);
    })
  }
}