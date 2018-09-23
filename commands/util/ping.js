
module.exports.run = async (bot, message, args) => {
    const aPing = Math.round(bot.ping);
    global.emoji = '';
    
    if (aPing < 100) {
        emoji = '<:gping:492751178388471841>';
    } else if (aPing > 100 && aPing <= 180) {
        emoji = '<:nping:492751178484940811>';
    } else if (aPing > 180) {
        emoji = '<:bping:492751178241933343>';
    }

    await message.channel.send({embed:{
        description: `${emoji} Ping: ${aPing}ms`,
        color: 5652869
    }});
}

module.exports.config = {
    command: 'ping'
}