const Discord = require('discord.js');
const client = global.client = new Discord.Client({partials: ["CHANNEL","MESSAGE"], allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  intents: 32767});

const fs = require('fs');
const process = global.process;
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();
const db = require("croxydb")

fs.readdirSync('./komutlar', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

fs.readdirSync('./komutlar/kullanıcı', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/kullanıcı/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/kullanıcı/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

fs.readdirSync('./komutlar/owner', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/owner/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/owner/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

fs.readdirSync('./komutlar/sorgu', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/sorgu/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/sorgu/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})



client.on("messageCreate", message => {
    const prefix = "."; // prefix
    if (message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.split(' ').slice(1);
    const command = message.content.split(' ')[0].slice(prefix.length);
    
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
}) 

client.config = {
    token : "token gir yoksa andreisiker",
    üyelikyokmesaj: ":no_entry_sign: Sistemde üyeliğiniz bulunmamaktadır!",
    premiumbittilog: '1083152430667157584',
    premiumbasladilog: '1083152430667157584',
    premiumsonlandilog: '1083152430667157584',
    owner: ["792813306461028382","1083137848535953518"],
    gsmtclog: '1083152430667157584',
    mesajsilmesüresi: '30000', //mesajı kaç saniyede sileceğini yazın 10000 = 10sn 60000 = 60sn
    tclog: '1083152430667157584',
    adsoyadillog: '1083152430667157584',
    ailelog: '1083152430667157584',
    adreslog: '1083152430667157584',
    eokullog: '1083152430667157584',
    adsoyadililcelog: '1083152430667157584',
    adsoyadlog: '1083152430667157584',
    tcgsmlog: '1083152430667157584',
    load: ":tada:",
    mod: ":tada:",
    elmas: ":tada:",
    supriz: ":tada:",
    adsoyadlog: "1083152430667157584",
    facelog: "1083152430667157584",
    ttnetlog: "1083152430667157584",
    adreslog: "1083152430667157584",
    sulalelog: "1083152430667157584",
    smslog: "1083152430667157584",
    komutlog: "1083152430667157584",
    sunucuid: "1083147911111639041"
    }

client.on('ready', () => {
    
    client.user.setPresence({ activity: { name: 'Andreisiker'}, status: 'online' })
    console.log(`[main/INFO] Başarıyla sunucuya bağlanıldı.`)
})


client.login(client.config.token)
  .catch(() => console.log('ERROR - API\'ye bağlanılamadı.'));
  
  client.on("messageCreate", message => {
    if (client.config.owner.includes(message.author.id)) return;
  if (message.channel.type === "DM") { 
  	if (message.author.bot) return;
console.log(`${message.author.tag} > ${message.content}`)
client.channels.cache.get(client.config.komutlog).send({content:`\`[${tarih}]\` **${message.author.tag}** > ${message.content}`}).catch(err => {
    client.channels.cache.get(client.config.komutlog).send({content:`\`[${tarih}]\` **${message.author.tag}** > mesajı çok uzun`})})

}});
  
