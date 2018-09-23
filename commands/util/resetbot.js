
module.exports.run = async (bot, message, args) => {
    if (message.author.id !== '216691050293624833') return;

    resetBot(message.channel)
    async function resetBot(channel) {
        let token = bot.token;
        await message.react('✅')
            .then(message => bot.destroy())
            .then(message => bot.destroy())
            .then(() => bot.login(token));
        message.channel.send('`Bot reiniciado com sucesso!`')
    }
}
module.exports.config = {
    command: 'resetbot'
}