const jimp = require('jimp');
const fs = require('fs');
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`<@${message.author.id}> **informe um usuário**`);
    let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    var imgAuthor = jimp.read(message.author.avatarURL);
    var imgUsuario = jimp.read(member.user.avatarURL);
    var mask = jimp.read("./inputfile/circulo.png");
    var path = jimp.read('./inputfile/tapa.jpg');

    await Promise.all([imgAuthor, mask]).then(function (images) {
        var author = images[0];
        var mask = images[1];
        mask.resize(100, 100);
        author.resize(100, 100);

        author.mask(mask, 0, 0).write('./outputfile/imgauthor.png');
    });

    await Promise.all([imgUsuario, mask]).then(function (images) {
        var usuario = images[0];
        var mask = images[1];
        mask.resize(100, 100);
        usuario.resize(100, 100);

        usuario.mask(mask, 0, 0).write('./outputfile/imgusuario.png');
    });

    var imgUsuarioEdit = jimp.read('./outputfile/imgusuario.png');
    var imgAuthorEdit = jimp.read('./outputfile/imgauthor.png');

    await Promise.all([imgAuthorEdit, path]).then(function (images) {
        var author = images[0];
        var mask = images[1];
        mask.composite(author, 180, 27);

        mask.write('./outputfile/tapaedit.jpg');
    });

    await Promise.all([imgUsuarioEdit, path]).then(function (images) {
        var usuario = images[0];
        var mask = images[1];
        mask.composite(usuario, 310, 120);
        mask.quality(60);

        mask.write('./outputfile/tapaedit.jpg');
    });

    await message.channel.send(`**${message.author.username} deu um tapa em ${member.user.username}**`);
    await message.channel.sendFile('./outputfile/tapaedit.jpg');

    await fs.unlink('./outputfile/tapaedit.jpg');
    await fs.unlink('./outputfile/imgauthor.png');
    await fs.unlink('./outputfile/imgusuario.png');
}

module.exports.config = {
    command: 'tapa'
}