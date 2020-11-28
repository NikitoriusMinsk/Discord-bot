module.exports = {
    name: 'roll',
    description: 'rolls a random number',
    execute(message, args){
        console.log('!roll called');
        if(!args[1]){
            message.reply(' введи числовое значение.');
        }
        message.reply(` твой ролл: ${Math.floor(Math.random() * args[1])+1}`);
    }
}