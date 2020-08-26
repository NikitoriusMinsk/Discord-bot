const ytdl = require('ytdl-core');
const ytplaylist = require('youtube-playlist');

module.exports = {
    name: 'play',
    description: 'adds a song to music queue',
    async execute(message, args, servers, playing){
        console.log('!play called');
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
        
        function playPlaylist(playlist,message){
            ytplaylist(playlist, 'url').then(res=>{
                let urls = res.data.playlist;

                if(!message.member.voice.channel){
                    message.reply('You must be in a voice channel!');
                    return;
                }
                
                if(!servers[message.guild.id]) servers[message.guild.id] = {
                    queue:[]
                }
                    
                var server = servers[message.guild.id];
        
                if(playing.state){
                    //add to queue if playing
                    for (let i = 0; i < urls.length; i++) {
                        const element = urls[i];
                        server.queue.push(element);
                    }
                    return;
                }
                else{
                    if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
                        for (let i = 0; i < urls.length; i++) {
                            const element = urls[i];
                            server.queue.push(element);
                        }
                        play(connection, message);
                    })
                }
            });
        }

        if(!args[1]){
            message.reply('You must provide a YT link!');
            return;
        }

        if (isPlaylist(args[1])){
            playPlaylist(args[1],message);
            return;
        }

        if (!ytdl.validateURL(args[1])){
            message.reply('Link must be a YT video link');
            return;
        }        

        if(!message.member.voice.channel){
            message.reply('You must be in a voice channel!');
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

function isPlaylist(url){
    var regExp = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/g;
        var match = url.match(regExp);
        if (match){
            return true;
        }
        return false;
}


