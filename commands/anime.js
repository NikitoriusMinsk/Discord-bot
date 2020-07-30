const fetch = require('node-fetch');

module.exports = {
    name: 'anime',
    description: 'sends a random anime link',
    execute(message, args){
        SendRandomAnimeLink(message);
    }
}

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