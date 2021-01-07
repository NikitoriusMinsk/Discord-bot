module.exports = {
    name: 'addSeal',
    description: 'add a seal to list',
    execute(message, args, client){
        //check for args existance
        if (!args[1]){
            message.reply(" укажи тюленя!(в винительном падеже) пример: !addseal тюленя-парашутиста");
            return;
        }
        //generate a seal
        let sealName = args[1];
        for (let i = 2; i < args.length; i++) {
            const element = args[i];
            sealName += ` ${element}`;
        }
        //push seal into DB
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