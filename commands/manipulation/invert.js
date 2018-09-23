const jimp = require('jimp');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`<@${message.author.id}> **informe um usuário**`);
    let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    jimp.read(member.user.avatarURL)
        .then(img => {
            img.invert();
            img.write('./outputfile/memberinvert.jpg', async function () {
                await message.channel.send('<:imagem:492036737019674644> **Sua imagem:**')
                await message.channel.sendFile('./outputfile/memberinvert.jpg');
                await fs.unlink('./outputfile/memberinvert.jpg');
            });
        })
        .catch(err => {
            console.error(err);
            message.channel.send('Não foi possível realizar a manipulação da imagem.')
        })
}

module.exports.config = {
    command: 'invert'
}