const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'queue',
    description: 'post the music queue',
    async execute(message, args, servers, playing){
        console.log('!queue called');
        var server = servers[message.guild.id];
        if (server) {   
            if(server.queue.length!=0){
                sendQueue(server,message,playing)
            }
            else{
                message.channel.send('Queue is empty');
            }
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
    let symbCount = 0;
    let embedField = 1;
    for (let i = 0; i < queue.length; i++) {
        try {
            let info = await ytdl.getInfo(queue[i]);
            symbCount += info.videoDetails.title.length;
            if (symbCount>900) {
                embedField++;
                embed.addField(`Queue ${embedField}`, ' ');
                symbCount = 0;
            }
            embed.fields[embedField].value += [`${i+1}. `, info.videoDetails.title.toString(),'\n'].join("");
        } catch (error) {
            queue.splice(i,1);
            continue;
        }
        
    }

    msg.channel.send(embed);
}