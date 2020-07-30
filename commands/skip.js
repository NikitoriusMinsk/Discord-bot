const ytdl = require('ytdl-core');

module.exports = {
    name: 'skip',
    description: 'skips the current song',
    execute(message, args, servers){
        var server = servers[message.guild.id];
        message.channel.send('Skipping...');
        server.queue.shift();
        if(server.dispatcher) server.dispatcher.end();
    }
}