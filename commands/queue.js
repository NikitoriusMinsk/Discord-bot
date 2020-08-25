const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'queue',
    description: 'post the music queue',
    async execute(message, args, servers, playing){
        var server = servers[message.guild.id];
        if(server.queue.length!=0){
            sendQueue(server,message,playing)
        }
        else{
            message.channel.send('Queue is empty');
        }
    }
}

async function sendQueue(urls, msg, playing){
    let queue = urls.queue;
    let embed = new Discord.MessageEmbed().addField('Playing:', playing.title);
    embed.addField('Queue:', ' ');
    for (let i = 0; i < queue.length; i++) {
        let info = await ytdl.getInfo(queue[i]);
        embed.fields[1].value += [`${i+1}. `, info.videoDetails.title.toString(),'\n'].join("");
    }

    msg.channel.send(embed);
}