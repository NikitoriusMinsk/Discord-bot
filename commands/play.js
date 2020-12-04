const ytdl = require('ytdl-core');
const ytplaylist = require('youtube-playlist');

module.exports = {
    name: 'play',
    description: 'adds a song to music queue',
    async execute(message, args, servers, playingState){
        console.log('!play called');
        async function play(connection, message){
            var server = servers[message.guild.id];

            try {
                message.channel.send(`Сейчас играет: ${server.queue[0]}`);  
                server.dispatcher = connection.play(ytdl(server.queue[0], {filter:"audioonly"}));  
                let info = await ytdl.getInfo(server.queue[0]);
                playingState.title = info.videoDetails.title=undefined?'err':info.videoDetails.title;
                playingState.state = true;
                server.queue.shift();
                
            } catch (error) {
                console.log(error);
                message.channel.send('Во время проигрывания произошла ошибка.');
                server.queue.shift();
                if(server.queue.length != 0){
                    play(connection,message);
                }
                else{
                    connection.disconnect();
                    playingState.state = false;
                }
                return;
            }
            
            server.dispatcher.on("finish", function(){
                if(server.queue.length==0){
                    message.channel.send('Треки кончились, выхожу.')
                    connection.disconnect();
                    playingState.state = false;
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
                    message.reply(' нужно находится в голосовом канале!');
                    return;
                }
                
                if(!servers[message.guild.id]) servers[message.guild.id] = {
                    queue:[]
                }
                    
                var server = servers[message.guild.id];
        
                if(playingState.state){
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
            message.reply(' укажи ссылку на Youtube-видео.');
            return;
        }

        if (isPlaylist(args[1])){
            playPlaylist(args[1],message);
            return;
        }

        if (!ytdl.validateURL(args[1])){
            message.reply(' укажи ссылку на Youtube-видео.');
            return;
        }        

        if(!message.member.voice.channel){
            message.reply(' нужно находится в голосовом канале!');
            return;
        }

        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue:[]
        }
            
        var server = servers[message.guild.id];
        
        if(playingState.state){
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


