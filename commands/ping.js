module.exports = {
    name: 'ping',
    description: 'says pong!',
    execute(message, args){
        console.log('!ping called');
        message.channel.send('pong!');
    }
}