const Discord = require("discord.js");
const ms = require('ms');
const db = require('quick.db')
const roleMute = new db.table('configs');
const configChannel = new db.table('configs');

module.exports.run = async (bot, message, args) => {


    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('_**__ATENÇÃO__ você não possui permissões suficientes.**_');
    if (args[0] == "help") {
        message.reply("Use: /tempmute <user> <1s/m/h/d> <reason>");
        return;
    }
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("_Não consegui encontrar o usuário mencionado._");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(`**ATENÇÃO** eu não posso mutar este usuário!`);
    let reason = args[2];
    if (!reason) return message.reply('**_Você deve adicionar uma razão._**');

    let muteRole = roleMute.get(`${message.guild.id}.mutedRole`);

    let muterole = message.guild.roles.find(`name`, muteRole);
    if (!muterole) return message.channel.send(`_Não consegui encontrar a role de Mutados._\n**Dica: Use o comando => /configrole <role>**`);

    let mutetime = args[1];
    if (!mutetime) return message.reply(`_Faça a especificação do tempo do mute!_ \`1s/m/h/d\``);

    message.delete().catch(O_o => { });

    try {
        await tomute.send(`Opa! Você foi mutado por: ${mutetime} no servidor ${message.guild.name}. Desculpe!`)
    } catch (e) {
        message.channel.send(`O usuário ${tomute} foi mutado por: ${mutetime}`)
    }

    let muteembed = new Discord.RichEmbed()
        .setDescription(`Mute executador por ${message.author}`)
        .setColor('#e56b00')
        .addField("Usuário mutado", tomute)
        .addField("Mutad em", message.channel)
        .addField("Mutado há", message.createdAt)
        .addField("Tempo do mute", mutetime)
        .addField("Razão", reason);

    var canal = configChannel.get(`${message.guild.id}.canal`);

    let muteChannel = message.guild.channels.find(`name`, `${canal}`);
    if(!muteChannel) return message.channel.send("Não foi possível encontrar o canal para mute.\n_**Dica: Use comando => /configchannel <canal> para configurar o canal de mute (Sugestão: configure como logs)**_");

    muteChannel.send(muteembed);

    await (tomute.addRole(muterole.id));

    setTimeout(function () {
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> foi desmutado!`);
    }, ms(mutetime));

}

module.exports.config = {
    command: "tempmute"
}