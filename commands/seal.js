const seals = require("../seals.json");
const stats = require("../sealStats.json");
const fs = require("fs");

module.exports = {
    name: 'seal',
    description: 'drops a seal',
    execute(message, args){
        console.log('!seal called');
        let rarity = Random(100);
        let sealNum = Random(seals["count"]);

        if(!stats[message.author.id]){
            stats[message.author.id] = {
                common : 0,
                rare : 0,
                epic : 0,
                legendary : 0,
                goldenLegendary : 0
            }
        }

        if  ((rarity >= 1) && (rarity <= 70)){
            //common
            message.reply(` вызвал ${seals[sealNum]} обычного качества!`);
            stats[message.author.id].common = stats[message.author.id].common + 1;
            SaveStats();
            return;
        }

        if  ((rarity >= 71) && (rarity <= 96)){
            //rare
            message.reply(` вызвал ${seals[sealNum]} редкого качества!`);
            stats[message.author.id].rare = stats[message.author.id].rare + 1;
            SaveStats();
            return;
        }

        if  ((rarity >= 97) && (rarity <= 99)){
            //epic
            message.reply(` вызвал ${seals[sealNum]} эпического качества!`);
            stats[message.author.id].epic = stats[message.author.id].epic + 1;
            SaveStats();
            return;
        }

        if  (rarity == 100){
            //legendary
            if(Random(100)==100){
                message.reply(` вызвал ${seals[sealNum]} ЗОЛОТОГО ЛЕГЕНДАРНОГО качества!`);
                stats[message.author.id].goldenLegendary = stats[message.author.id].goldenLegendary + 1;
                SaveStats();
                return;
            }
            message.reply(` вызвал ${seals[sealNum]} легендарного качества!`);
            stats[message.author.id].legendary = stats[message.author.id].legendary + 1;
            SaveStats();
            return;
        }
    }
}

function Random(max){
    return Math.floor(Math.random() * Math.floor(max))+1;
}

function SaveStats(){
    fs.writeFile("./sealStats.json", JSON.stringify(stats), (err) => {
        if(err){
            console.log(err);
        }
    })
}