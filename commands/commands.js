const Discord = require('discord.js');

module.exports = {
    name: 'commands',
    description: 'list of commands',
    execute(message, args){
        console.log('!commands called');
        let embed = new Discord.MessageEmbed().addField('Список доступных комманд :',`!play <ссылка наYT видео> - помещает трек в очередь \n 
        !playlist <ссылка на YT плейлист> - помещает плейлист в очередь \n 
        !skip - пропускет текущий трек \n 
        !stop - останавливает очередь \n 
        !queue - показывает первые 30 треков в очереди \n
        !pause - приостанавливает воспроизведение\n
        !resume - возобнавляет воспроизведение \n
        !image <ключевое слово> - случайная картинка \n 
        !roulette <create/join/start/list> - рулетка на кик с сервера \n 
        !anime - случайное аниме \n 
        !roll <значение> - случайное число между 1 и заданным значением \n
        !peko - одумайся. \n 
        !hit <@кто-то> - ударяет огромной алебардой \n
        !тюленя - вызывает тюленя \n
        !addseal <тюлень в винительном падеже> - добавляет тюленя в список \n
        !stats - статистика по призванным тюленям \n
        !ping <> - pong!`);
        message.channel.send(embed);
    }
}