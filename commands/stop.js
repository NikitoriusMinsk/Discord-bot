const ytdl = require('ytdl-core');

module.exports = {
    name: 'stop',
    description: 'stops the queue',
    execute(message, args, servers){
        console.log('!stop called');
        var server = servers[message.guild.id];
        if (server) {            
            if(message.guild.voice.connection){
                for (let i = server.queue.length-1; i>=0; i--) {                    
                    server.queue.splice(i,1);
                }
                server.dispatcher.end();
                message.channel.send('Queue stopped!');
                
                if(message.guild.voice.connection) message.guild.voice.connection.disconnect();
            }
        }
        else{
            message.channel.send('Queue is empty.')
        }
    }
}