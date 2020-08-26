const Discord = require('discord.js');

module.exports = {
    name: 'commands',
    description: 'list of commands',
    execute(message, args){
        console.log('!commands called');
        let embed = new Discord.MessageEmbed().addField('List of available commands :',`!play <YT video/playlist link> - places a song/playlist into the queue \n 
        !skip - skips the current song \n 
        !stop - stops the music \n 
        !queue - posts current music queue \n
        !image <keyword> - random Google Image \n 
        !roulette <create/join/start/list> - server kick roulette \n 
        !anime - random anime \n 
        !roll <value> - random number between 1 and your value \n
        !peko - just don't. \n 
        !hit <@someone> - hit someone with a giant halberd \n
        !ping <> - pong!`);
        message.author.send(embed);
    }
}