const seals = require("../seals.json");
const fs = require("fs");

module.exports = {
    name: 'addSeal',
    description: 'add a seal to JSON list',
    execute(message, args){
        if (!args[1]){
            message.reply(" укажи тюленя!(в винительном падеже) пример: !addseal тюленя-парашутиста");
            return;
        }

        let sealName = args[1];
        for (let i = 2; i < args.length; i++) {
            const element = args[i];
            sealName += ` ${element}`;
        }
        
        seals[seals["count"]+1] = sealName;
        seals["count"] = seals["count"] + 1;

        fs.writeFile("./seals.json", JSON.stringify(seals), (err) => {
            if(err){
                console.log(err);
            }
        })

        message.reply(` добавил ${sealName} в список`);

        return;
    }
}