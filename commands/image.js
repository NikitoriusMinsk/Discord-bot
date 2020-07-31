const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    name: 'image',
    description: 'sends a random Google Image depending on arguments',
    execute(message, args){
        if(!args[1]){
            message.channel.send("You must provide a keyword");
            return;
        }
        image(message, args[1]);
    }
    
}

function image(message, keyword){
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=",
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