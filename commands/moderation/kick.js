const Discord = require("discord.js");
const db = require('quick.db');
var configChannel = new db.table(`configs`);

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('**Você não tem permissões para usar este comando!**')
    if (!args[0]) return message.channel.send('**_Você deve mencionar o usuário que deseja kickar._**');
    if (!args[1]) return message.channel.send('**_Você deve adicionar uma razão._**');
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send(`_Não consegui encontrar o usuário mencionado._`);
    if(kUser.id === bot.user.id) return message.channel.send(`**ATENÇÃO** eu não posso kickar este usuário!`);
    let kReason = args.join(" ").slice(22);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**ATENÇÃO** eu não posso kickar este usuário!`);

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Usuário kickado", `${kUser}`)
    .addField("Kickado por", `<@${message.author.id}>`)
    .addField("Kickado em", `${message.channel}`)
    .addField("Horário que foi kickado", `${message.createdAt}`)
    .addField("Razão", kReason);


    var canal = configChannel.get(`${message.guild.id}.canal`);

    let kickChannel = message.guild.channels.find(`name`, `${canal}`);
    if(!kickChannel) return message.channel.send("Não foi possível encontrar o canal para kicks.\n_**Dica: Use comando => /configchannel <canal> para configurar o canal de kicks (Sugestão: configure como logs)**_");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.config = {
  command: "kick"
}