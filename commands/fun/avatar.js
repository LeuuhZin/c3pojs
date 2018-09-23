const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {
    var array = [
        'Uaau :scream:',
        'Nota 10, meu querido(a)',
        'Que sustoo! Não faça mais isso!'
    ];

    if (!args[0]) return message.channel.send(`<@${message.author.id}> **informe um usuário**`);

    let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    var randomIndex = Math.floor(Math.random() * array.length);
    var randomElement = array[randomIndex];

    let embed = new Discord.RichEmbed()
    .setAuthor(`Foto de perfil de ${member.user.username}`)
    .setImage(`${member.user.avatarURL}`)
    .setFooter(`${randomElement}`, `${bot.user.avatarURL}`)
    .setTimestamp(new Date())
    .setColor('#EAB543');

    message.channel.send(embed);
}

module.exports.config = {
    command: 'avatar'
}