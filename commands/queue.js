const Discord = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'post the music queue',
    execute(message, args, servers){
        var server = servers[message.guild.id];
        if(server.queue.length!=0){
            let embed = new Discord.MessageEmbed().addField('Queue :',' ');
            server.queue.forEach(element => {
                embed.fields[0].value+=element+'\n';
            });
            message.channel.send(embed);
        }
        else{
            message.channel.send('Queue is empty');
        }
    }
}