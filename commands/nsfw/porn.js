const randomPuppy = require('random-puppy');
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {    
    if (!message.channel.nsfw) return message.reply("Você só pode usar este comando em canais NSFW");

    var subreddits = [
        'NSFW_Wallpapers',
        'SexyWallpapers',
        'HighResNSFW',
        'nsfw_hd',
        'UHDnsfw'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
        .then(url => {
            const embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setImage(url);
            message.channel.send({
                embed
            });
        })
}

module.exports.config = {
    command: 'porn'
}