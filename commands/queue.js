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
                message.channel.send('Ща, сек.')
                sendQueue(server,message,playing)
            }
            else{
                message.channel.send('В очереди ничего нет.');
            }
        }
        else{
            message.channel.send('В очереди ничего нет.');
        }
    }
}

async function sendQueue(urls, msg, playing){
    let queue = urls.queue;
    let embed = new Discord.MessageEmbed().addField('Играет сейчас:', playing.title);
    embed.addField('Очередь:', ' ');
    let symbCount = 0;
    let embedField = 1;
    if(queue.length>30){
        for (let i = 0; i < 30; i++) {
            try {
                let info = await ytdl.getInfo(queue[i]);
                symbCount += info.videoDetails.title.length;

                if (symbCount>900) {
                    embedField++;
                    embed.addField(`Очередь ${embedField}`, ' ');
                    symbCount = 0;
                }
                embed.fields[embedField].value += [`${i+1}. `, info.videoDetails.title.toString(),'\n'].join("");
            } catch (error) {
                queue.splice(i,1);
                continue;
            }        
        }
        embed.fields[embedField].value += `и еще ${queue.length-30}.`
    }
    else{
        for (let i = 0; i < queue.length; i++) {
            try {
                let info = await ytdl.getInfo(queue[i]);
                symbCount += info.videoDetails.title.length;

                if (symbCount>900) {
                    embedField++;
                    embed.addField(`Очередь ${embedField}`, ' ');
                    symbCount = 0;
                }
                embed.fields[embedField].value += [`${i+1}. `, info.videoDetails.title.toString(),'\n'].join("");
            } catch (error) {
                queue.splice(i,1);
                continue;
            }        
        }
    }
        
    msg.channel.send(embed);
}