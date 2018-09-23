const Discord = require("discord.js");
const db = require('quick.db');
var configChannel = new db.table(`configs`);

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('**Você não tem permissões para usar este comando!**');
    if (!args[0]) return message.channel.send('**_Você deve mencionar o usuário que deseja banir._**');
    if (!args[1]) return message.channel.send('**_Você deve adicionar uma razão._**');
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send(`_Não consegui encontrar o usuário mencionado._`);
    if(bUser.id === bot.user.id) return message.channel.send(`**ATENÇÃO** eu não posso banir este usuário!`);
    let bReason = args.join(" ").slice(22);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**ATENÇÃO** eu não posso banir este usuário!`);

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Usuário banido", `${bUser} with ID ${bUser.id}`)
    .addField("Banido por", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banido em", message.channel)
    .addField("Horário que foi banido", message.createdAt)
    .addField("Razão", bReason);

    var canal = configChannel.get(`${message.guild.id}.canal`);

    let banChannel = message.guild.channels.find(`name`, `${canal}`);
    if(!banChannel) return message.channel.send("Não foi possível encontrar o canal para bans.\n_**Dica: Use comando => /configchannel <canal> para configurar o canal de kicks (Sugestão: configure como logs)**_");

    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);
}

module.exports.config = {
  command:"ban"
}