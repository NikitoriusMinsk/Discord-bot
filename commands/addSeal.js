module.exports = {
    name: 'addSeal',
    description: 'add a seal to JSON list',
    execute(message, args, client){
        if (!args[1]){
            message.reply(" укажи тюленя!(в винительном падеже) пример: !addseal тюленя-парашутиста");
            return;
        }

        let sealName = args[1];
        for (let i = 2; i < args.length; i++) {
            const element = args[i];
            sealName += ` ${element}`;
        }
        
        client.query(`INSERT INTO seals(name) values('${sealName}');`, (err, res) => {
            if(err){
                console.log(err, res);
                return;
            }
        });

        message.reply(` добавил ${sealName} в список`);

        return;
    }
}