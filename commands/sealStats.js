const stats = require("../sealStats.json");
const Discord = require('discord.js');

module.exports = {
    name: 'sealStats',
    description: 'shows seal stats',
    execute(message, args){
        let embed = new Discord.MessageEmbed();
        embed.addField(`Тюлени ${message.author.username}`, `Обычные : ${stats[message.author.id].common}\n
        Редкие : ${stats[message.author.id].rare}\n
        Эпические: ${stats[message.author.id].epic}\n
        Легендарные: ${stats[message.author.id].legendary}\n
        ЗОЛОТЫЕ ЛЕГЕНДАРНЫЕ: ${stats[message.author.id].goldenLegendary}`);
        message.channel.send(embed);
    }
}