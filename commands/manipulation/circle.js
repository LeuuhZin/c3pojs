const jimp = require('jimp');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`<@${message.author.id}> **informe um usuário**`);
    let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    var imgUsuario = jimp.read(member.user.avatarURL);
    var mask = jimp.read("./inputfile/circulo.png");

    await Promise.all([imgUsuario, mask]).then(function (images) {
        var usuario = images[0];
        var mask = images[1];
        mask.resize(128, 128);
        usuario.resize(128, 128);

        usuario.mask(mask, 0, 0).write('./outputfile/imgusuarioc.png');
    });

    await message.channel.send('<:imagem:492036737019674644> **Sua imagem:**')
    await message.channel.sendFile('./outputfile/imgusuarioc.png');

    await fs.unlink('./outputfile/imgusuarioc.png');
}

module.exports.config = {
    command: 'circle'
}