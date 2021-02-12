//node . - запуск
// ctrl + c - завершение
require('dotenv').config(); 
const Discord = require('discord.js');;
const fs = require('fs');
const commands = require('./commands/commands');
const bot = new Discord.Client();
const prefix = '!';
const cooldown = 5000;
const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
});

client.connect();

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

var rouletteList = {starter:'', users:[]};
var servers = [];
var usedCommandRecently = new Set();
var playingState = {state : false,
                    title: ' '};

bot.on('ready', () => {
    console.log('Bot is online!');
});

bot.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
    
    let args = message.content.substring(prefix.length).split(" ");
    
    if(!usedCommandRecently.has(message.author)){
        usedCommandRecently.add(message.author);
        setTimeout(() => {
            usedCommandRecently.delete(message.author);
        }, cooldown);
    }
    else{
        message.reply(' соблюдай промежуток в 5 сек между командами, а?');
        return;
    }

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
            bot.commands.get('play').execute(message,args,servers,playingState);
        break;

        case 'skip':
            bot.commands.get('skip').execute(message,args,servers);
        break;

        case 'stop':
            bot.commands.get('stop').execute(message,args,servers);
        break;
    
        case 'queue':
            bot.commands.get('queue').execute(message,args,servers,playingState);
        break;

        case 'peko':
            args[1]='https://www.youtube.com/watch?v=dzj3OZMtnJ8';
            message.channel.send('IQ dump engaged. God save us all.');
            bot.commands.get('play').execute(message,args,servers);
        break;

        case 'hit':
            bot.commands.get('hit').execute(message,args,bot);
        break;

        case 'тюленя':
            bot.commands.get('seal').execute(message, args, client);    
        break;

        case 'addseal':
            bot.commands.get('addSeal').execute(message, args, client);    
        break;

        case 'stats':
            bot.commands.get('sealStats').execute(message, args, client);
        break;

        case 'playlist':
            bot.commands.get('playlist').execute(message,args,servers,playingState);
        break;

        case 'pause': 
            bot.commands.get('pause').execute(message,args,servers,playingState);
        break;

        case 'resume': 
            bot.commands.get('resume').execute(message,args,servers,playingState);
        break;
    }
});

bot.on('guildMemberAdd',(member)=>{
//Barbarian - 747439488002687087
member.guild.roles.fetch('747439488002687087')
            .then(role => member.roles.add(role));
})

bot.login(process.env.BOT_TOKEN);