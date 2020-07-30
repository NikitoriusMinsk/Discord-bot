//node . - запуск
// ctrl + c - завершение 
const Discord = require('discord.js');;
const fs = require('fs');
const commands = require('./commands/commands');
const bot = new Discord.Client();
const token = 'NzMzNDExNzU1NjM1NTA3MjEx.XxC7Aw.4IxJfXyRbE57qDJvZAd1JLU-ikc';
const prefix = '!';

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

var rouletteList = {starter:'', users:[]};
var servers = {};

bot.on('ready', () => {
    console.log('Bot is online!');
});

bot.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
    
    
    let args = message.content.substring(prefix.length).split(" ");
    
    switch(args[0]){
        
        case 'ping' :
            bot.commands.get('ping').execute(message,args);
        break;

        case 'image':
            bot.commands.get('image').execute(message,args);
        break;

        case 'roulette':
            bot.commands.get('roulette').execute(message,args,rouletteList);
        break;
        
        case 'commands':
            bot.commands.get('commands').execute(message,args);
        break;
        
        case 'anime':
            bot.commands.get('anime').execute(message,args);
        break;        
        
        case 'roll':
            bot.commands.get('roll').execute(message,args);
        break;
    
        case 'play':
            bot.commands.get('play').execute(message,args,servers);
        break;

        case 'skip':
            bot.commands.get('skip').execute(message,args,servers);
        break;

        case 'stop':
            bot.commands.get('stop').execute(message,args,servers);
        break;
    
        case 'queue':
            bot.commands.get('queue').execute(message,args,servers);
        break;

        case 'peko':
            args[1]='https://www.youtube.com/watch?v=dzj3OZMtnJ8';
            message.channel.send('IQ dump engaged. God save us all.');
            bot.commands.get('play').execute(message,args,servers);
        break;
    }
});

bot.login(token);