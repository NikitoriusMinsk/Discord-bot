//node . - запуск
// ctrl + c - завершение 
const Discord = require('discord.js');
const cheerio = require('cheerio');
const request = require('request');
const fetch = require('node-fetch');
const ytdl = require('ytdl-core');
const bot = new Discord.Client();
const token = 'NzMzNDExNzU1NjM1NTA3MjEx.XxC7Aw.4IxJfXyRbE57qDJvZAd1JLU-ikc';
const prefix = '!';

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
            message.channel.send('pong!');
        break;

        case 'image':
            if(!args[1]){
                message.channel.send("You must provide a keyword");
                return;
            }
            image(message, args[1]);
        break;

        case 'roulette':
            if(!args[1]){
                message.channel.send('Usage of command !roulette: !roulette <create/join/start/list>');
                return;
            }
            switch (args[1]){
                case 'create':{
                    if(!rouletteList.starter){
                        rouletteList.starter = message.author;
                        rouletteList.users.push(message.author);
                        message.channel.send(message.author.username + ' just created a kick roulette!');
                    }
                    else{
                        message.channel.send('Only one roulette can be active at a time!');          
                    }
                break;                
                }
                case 'join':{
                    if(!rouletteList.users.includes(message.author)){
                        rouletteList.users.push(message.author);
                        message.channel.send(message.author.username+' joins the kick roulette!');
                    }
                    else{
                        message.reply('You are already registered!');              
                    }
                    break;
                }
                case 'start':{
                    if(message.author===rouletteList.starter){
                        let rnd = Math.floor(Math.random() * rouletteList.users.length);
                        message.channel.send("<@"+ rouletteList.users[rnd].id + ">, you will be kicked from the server!");
                        KickUser(rouletteList.users[rnd],message);
                        rouletteList.users=[];
                        rouletteList.starter = '';
                    }
                    else{
                        message.reply('You must be the creator to start this roulette!');
                    }
                    break;
                }
                case 'list':{
                    let embed = new Discord.MessageEmbed().addField('Roulette list :',' ');
                    rouletteList.users.forEach(element => {
                        embed.fields[0].value+=' '+element.username+'\n';
                    });
                    message.channel.send(embed);
                    break;
                }
            }
        break;
        
        case 'commands':
            message.author.send('!play <YT link> - places a song into the queue \n !skip - skips the current song \n !stop - stops the music \n !image <keyword> - random Google Image \n !roulette <create/join/start/list> - server kick roulette \n !anime - random anime \n !roll <value> - random number between 1 and your value \n !ping <> - pong!');
        break;
        
        case 'anime':
            SendRandomAnimeLink(message);
        break;        
        
        case 'roll':
            if(!args[1]){
                message.channel.send('You must provide a value!');
            }
            message.reply('your roll: '+Math.floor(Math.random() * args[1]));
        break;
    
        case 'play':

        function play(connection, message){
            var server = servers[message.guild.id];

            server.dispatcher = connection.play(ytdl(server.queue[0], {filter:"audioonly"}));

            server.dispatcher.on("finish", function(){
                if(server.queue[1]){
                    server.queue.shift();
                    play(connection,message);
                    return;
                }
                if(server.queue[0]){                   
                    play(connection,message);
                    return;
                }
                else{
                    connection.disconnect();
                }
            })
        }

            if(!args[1]){
                message.channel.send('You must provide a link!');
                return;
            }

            if(!message.member.voice.channel){
                message.channel.send('You must be in a voice channel!');
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue:[]
            }
            
            var server = servers[message.guild.id];

            if(server.queue.length!=0){
                server.queue.push(args[1]);
            }
            else{
                if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
                    server.queue.push(args[1]);
                    play(connection, message);
                })
            }
        break;

        case 'skip':
            var server = servers[message.guild.id];
            message.channel.send('Skipping...');
            server.queue.shift();
            if(server.dispatcher) server.dispatcher.end();
        break;

        case 'stop':
            var server = servers[message.guild.id];
            if(message.guild.voice.connection){
                for (let i = server.queue.length-1; i>=0; i--) {                    
                    server.queue.splice(i,1);
                }
                server.dispatcher.end();
                message.channel.send('Queue stopped!');

                if(message.guild.voice.connection) message.guild.voice.connection.disconnect();
            }
        break;
    
        case 'queue':
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
        break;
    }
});

async function SendRandomAnimeLink(message){
    let response = await fetch('https://yummyanime.club/random', {
        method: "GET",
        headers: {
            "accept": "text/html",
            "user-agent": "Chrome",
        }
    });

    message.channel.send(response.url);    
};

function KickUser(user, message){
    const member = message.guild.member(user);
    member
        .kick('Loser')
        .then(() => {
        // We let the message author know we were able to kick the person
        message.channel.send(`Successfully kicked ${user.tag}`);
        })
};

function image(message, keyword){
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + keyword,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome",
            "Cookie": "ws_prefs=vr=1&af=None"
        }
    };
 
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
        $ = cheerio.load(responseBody);
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
 
        if (!urls.length) {
            message.channel.send('No pictures found!');
            return;
        }
 
        // Send result
        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    });
};

bot.login(token);