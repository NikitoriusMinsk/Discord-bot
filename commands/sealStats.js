const Discord = require('discord.js');

module.exports = {
    name: 'sealStats',
    description: 'shows seal stats',
    execute(message, args, client){
        client.query(`SELECT * FROM stats WHERE id=${message.author.id}`, (err,res)=>{
            if(err){
                console.log(err,res);
                message.send("Произошла ошибка при получении статистики, тыкайте Никиту");
                return;
            }
            let embed = new Discord.MessageEmbed();
            embed.addField(`Тюлени ${message.author.username}`, `Обычные : ${res.rows[0].common}\n
            Редкие : ${res.rows[0].rare}\n
            Эпические: ${res.rows[0].epic}\n
            Легендарные: ${res.rows[0].legendary}\n
            ЗОЛОТЫЕ ЛЕГЕНДАРНЫЕ: ${res.rows[0].golden_legendary}`);
            message.channel.send(embed);
        })
    }
}