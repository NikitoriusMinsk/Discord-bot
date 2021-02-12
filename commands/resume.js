module.exports = {
    name: 'resume',
    description: 'resumes playback',
    execute(message, args, servers, playingState){
        if(playingState.state == true){
            server = servers[message.guild.id];
            
            server.dispatcher.resume();
            message.channel.send("Продолжаю воспроизведение");
            return;
        }
        else{
            message.channel.send("Сейчас ничего не играет!");
            return;
        }
    }
}