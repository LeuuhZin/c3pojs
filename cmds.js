var fs = require('fs');

module.exports.runCmd = (fs, bot) => {
    //Comandos de música
    fs.readdir('./commands/music', (err, files) => {
        if (err) console.error(err);
        var jsfiles = files.filter(f => f.split('.').pop() === "js");

        jsfiles.forEach((f, i) => {
            delete require.cache[require.resolve(`./commands/music/${f}`)];
            var cmds = require(`./commands/music/${f}`);
            bot.commands.set(cmds.config.command, cmds);
        });
    });

    //Comandos de moderação
    fs.readdir('./commands/moderation', (err, files) => {
        if (err) console.error(err);
        var jsfiles = files.filter(f => f.split('.').pop() === "js");

        jsfiles.forEach((f, i) => {
            delete require.cache[require.resolve(`./commands/moderation/${f}`)];
            var cmds = require(`./commands/moderation/${f}`);
            bot.commands.set(cmds.config.command, cmds);

        });
    });

    //Comandos de configuração
    fs.readdir('./commands/configs', (err, files) => {
        if (err) console.error(err);
        var jsfiles = files.filter(f => f.split('.').pop() === "js");

        jsfiles.forEach((f, i) => {
            delete require.cache[require.resolve(`./commands/configs/${f}`)];
            var cmds = require(`./commands/configs/${f}`);
            bot.commands.set(cmds.config.command, cmds);
        });
    });

    //Comandos de utilidade
    fs.readdir('./commands/util', (err, files) => {
        if (err) console.error(err);
        var jsfiles = files.filter(f => f.split('.').pop() === "js");

        jsfiles.forEach((f, i) => {
            delete require.cache[require.resolve(`./commands/util/${f}`)];
            var cmds = require(`./commands/util/${f}`);
            bot.commands.set(cmds.config.command, cmds);
        });
    });

    //Comandos de diversão
    fs.readdir('./commands/fun', (err, files) => {
        if (err) console.error(err);
        var jsfiles = files.filter(f => f.split('.').pop() === "js");

        jsfiles.forEach((f, i) => {
            delete require.cache[require.resolve(`./commands/fun/${f}`)];
            var cmds = require(`./commands/fun/${f}`);
            bot.commands.set(cmds.config.command, cmds);
        });
    });

    //Comandos de manipução
    fs.readdir('./commands/manipulation', (err, files) => {
        if (err) console.error(err);
        var jsfiles = files.filter(f => f.split('.').pop() === "js");

        jsfiles.forEach((f, i) => {
            delete require.cache[require.resolve(`./commands/manipulation/${f}`)];
            var cmds = require(`./commands/manipulation/${f}`);
            bot.commands.set(cmds.config.command, cmds);
        });
    });

    //Comandos de NSFW
    fs.readdir('./commands/nsfw', (err, files) => {
        if (err) console.error(err);
        var jsfiles = files.filter(f => f.split('.').pop() === "js");

        jsfiles.forEach((f, i) => {
            delete require.cache[require.resolve(`./commands/nsfw/${f}`)];
            var cmds = require(`./commands/nsfw/${f}`);
            bot.commands.set(cmds.config.command, cmds);
        });
    });
}