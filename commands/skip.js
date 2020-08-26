const ytdl = require('ytdl-core');

module.exports = {
    name: 'skip',
    description: 'skips the current song',
    execute(message, args, servers){
        console.log('!skip called');
        var server = servers[message.guild.id];
        if (server) {   
            message.channel.send('Skipping...');
            if(server.dispatcher) server.dispatcher.end();
        }
        else{
            message.reply('Nothing to skip.')
        }
    }
}