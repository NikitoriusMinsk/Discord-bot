const ytdl = require('ytdl-core');
const ytpl = require('ytpl');

module.exports = {
    name: 'playlist',
    description: 'adds a playlist to the queue',
    execute(message, args, servers, playingState){
        console.log('!playlist called')
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
        //check for args existance
        if(!args[1]){
            message.reply(' укажи ссылку на Youtube-плейлист.');
            return;
        }
        //validate playlist url
        var regex = new RegExp(/^.*(youtu.be\/|list=)([^#\&\?]*).*/);
        if (!regex.exec(args[1])){//validate url
            message.reply(' укажи ссылку на Youtube-плейлист.');
            return;
        }        
        //check if user is in a voice channel
        if(!message.member.voice.channel){
            message.reply(' нужно находится в голосовом канале!');
            return;
        }
        //check fro queue existance
        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue:[]
        }
            
        var server = servers[message.guild.id];
        // if something is already playing
        if(playingState.state){
            //push all track to queue without playing
            GetPlaylist(args[1]).then(items => {
                items.forEach(element => {
                    server.queue.push(element.shortUrl);
                })
            });
            return;
        }
        else{
            if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
                //push all track to queue with playing
                GetPlaylist(args[1]).then(items => {
                    items.forEach(element => {
                        server.queue.push(element.shortUrl);
                    })
                    play(connection, message);
                });
            })
        }

    }
}

async function GetPlaylist(url){
    let playlist = await ytpl(url,{limit:Infinity});
    return playlist.items;
}