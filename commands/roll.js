module.exports = {
    name: 'roll',
    description: 'rolls a random number',
    execute(message, args){
        console.log('!roll called');
        if(!args[1]){
            message.channel.send('You must provide a value!');
        }
        message.reply(`your roll: ${Math.floor(Math.random() * args[1])}`);
    }
}