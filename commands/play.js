const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'adds a song to music queue',
    execute(message, args, servers, playing){
        async function play(connection, message){
            var server = servers[message.guild.id];

            message.channel.send(`Now playing: ${server.queue[0]}`);  
            server.dispatcher = connection.play(ytdl(server.queue[0], {filter:"audioonly"}));    
            let info = await ytdl.getInfo(server.queue[0]);
            playing.title = info.videoDetails.title;
            playing.state = true;
            server.queue.shift();

            server.dispatcher.on("finish", function(){
                if(server.queue.length==0){
                    message.channel.send('Queue ended, disconnecting.')
                    connection.disconnect();
                    playing.state = false;
                    return;
                }
                else{                                                         
                    play(connection,message);
                    return;
                }
            })
        }
        
        if(!args[1]){
            message.channel.send('You must provide a YT link!');
            return;
        }

        if (!ytdl.validateURL(args[1])){
            message.channel.send('Link must be a YT video link');
            return;
        }

        if(!message.member.voice.channel){
            message.channel.send('You must be in a voice channel!');
            return;
        }

        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue:[]
        }
            
        var server = servers[message.guild.id];

        if(playing.state){
            server.queue.push(args[1]);
            return;
        }
        else{
            if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
                server.queue.push(args[1]);
                play(connection, message);
            })
        }
    }
}