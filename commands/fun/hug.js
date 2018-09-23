
module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send('Você deve **mencionar** o usuário!');

    let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    global.msg =  message.channel.send(`${member.user.username} deseja aceitar o abraço?`)
        .then(async (msg) => {
            await msg.react('✅');
            await msg.react('❌');
            bot.on('messageReactionAdd', (reaction, user) => {
                if (reaction.emoji.name === '✅' && user.id !== bot.user.id && user.id === member.id) {
                    if (user.id === message.author.id) return;
                    reaction.remove(user);
                    msg.delete();
                    message.channel.send(`${member.user.username} aceitou o abraço!`);
                }

                if (reaction.emoji.name === '❌' && user.id !== bot.user.id && user.id === member.id) {
                    if (user.id === message.author.id) return;
                    reaction.remove(user);
                    msg.delete();
                    message.channel.send(`${member.user.username} recusou o abraço!`);
                }
            });
        })

}


module.exports.config = {
    command: "hug"
}