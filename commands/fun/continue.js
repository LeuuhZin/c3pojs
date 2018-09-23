const jimp = require('jimp');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`<@${message.author.id}> **informe o link**`);

    jimp.read(args[0])
        .then(img => {
            jimp.read('./inputfile/tobe.png')
                .then(img2 => {
                    img.resize(512, 256);
                    img2.resize(100, 80);

                    img.composite(img2, 15, 200);
                    img.write('./outputfile/tobeedit.png', async function() {
                        await message.channel.sendFile('./outputfile/tobeedit.png');
                        await fs.unlink('./outputfile/tobeedit.png');
                    });
                })
        });

    message.delete();
}

module.exports.config = {
    command: 'continue'
}