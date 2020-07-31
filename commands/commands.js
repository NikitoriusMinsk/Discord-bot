module.exports = {
    name: 'commands',
    description: 'list of commands',
    execute(message, args){
        message.author.send(`List of commands: \n
        !play <YT link> - places a song into the queue \n 
        !skip - skips the current song \n 
        !stop - stops the music \n 
        !queue - posts current music queue \n
        !image <keyword> - random Google Image \n 
        !roulette <create/join/start/list> - server kick roulette \n 
        !anime - random anime \n 
        !roll <value> - random number between 1 and your value \n
        !peko - just don't. \n 
        !ping <> - pong!`);
    }
}