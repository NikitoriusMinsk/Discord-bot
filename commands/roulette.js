const Discord = require('discord.js');

module.exports = {
    name: 'roulette',
    description: 'server kick roulette',
    execute(message, args, rouletteList){
        console.log('!roulette called');
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
                    message.channel.send(`<@${rouletteList.users[rnd].id}>, you will be kicked from the server!`);
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
    }
};

function KickUser(user, message){
    const member = message.guild.member(user);
    member
        .kick('Loser')
        .then(() => {
        // We let the message author know we were able to kick the person
        message.channel.send(`Successfully kicked ${user.tag}`);
        });
};