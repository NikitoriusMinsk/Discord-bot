module.exports = {
    name: 'pause',
    description: 'pauses playback',
    execute(message, args, servers, playingState){
        if(playingState.state == true){
            server = servers[message.guild.id];
            
            server.dispatcher.pause(true);
            message.channel.send("Для продолжения воспроизведения используйте !resume");
            return;
        }
        else{
            message.channel.send("Сейчас ничего не играет!");
            return;
        }
    }
}