const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    name: 'image',
    description: 'sends a random Google Image depending on arguments',
    execute(message, args){
        console.log('!image called');
        if(!args[1]){
            message.reply(" укажи ключевое слово");
            return;
        }
        image(message, args);
    }
    
}

function image(message, keywords){
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome",
            "Cookie": "ws_prefs=vr=1&af=None"
        }
    };

    keywords.forEach(element => {
        options.url += element+' ';
    });
 
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
        $ = cheerio.load(responseBody);
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
 
        if (!urls.length) {
            message.channel.send('Картинок не найдено!');
            return;
        }
 
        // Send result
        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    });
};