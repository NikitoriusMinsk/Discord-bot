module.exports = {
    name: 'seal',
    description: 'drops a seal',
    execute(message, args, client){
        console.log('!seal called');
        let rarity = Random(100);
        let sealName;
        client.query('SELECT * FROM seals ORDER BY random() LIMIT 1',(err, res)=>{
            if(err){
                console.log(err,res);
                message.channel.send('Произошла ошибка при получении тюленя, тыкайте Никиту');
                return;
            }
            sealName = res.rows[0].name;

            client.query(`SELECT EXISTS(SELECT 1 FROM stats WHERE id=${message.author.id});`, (err, res) => {
                if(err){
                    console.log(err,res);
                    message.channel.send('Произошла ошибка при проверке существования пользователя, тыкайте Никиту');
                    return;
                }
                if(res.rows[0].exists == false){
                    client.query(`INSERT INTO stats(id,common,rare,epic,legendary,golden_legendary) values('${message.author.id}',0,0,0,0,0)`,(err,res)=>{
                        if(err){
                            console.log(err,res);
                            message.channel.send('Произошла ошибка при добавлении нового пользователя, тыкайте Никиту');
                            return;
                        }
                    });
                }
            });
    
    
            if  ((rarity >= 1) && (rarity <= 70)){
                //common
                message.reply(` вызвал ${sealName} обычного качества!`);
                client.query(`UPDATE stats SET common=common+1 WHERE id=${message.author.id}`, (err,res)=>{
                    if(err){
                        console.log(err,res);
                        message.channel.send('Произошла ошибка при обновлении статистики, тыкайте Никиту');
                        return;
                    }
                });
                return;
            }
    
            if  ((rarity >= 71) && (rarity <= 96)){
                //rare
                message.reply(` вызвал ${sealName} редкого качества!`);
                client.query(`UPDATE stats SET rare=rare+1 WHERE id=${message.author.id}`, (err,res)=>{
                    if(err){
                        console.log(err,res);
                        message.channel.send('Произошла ошибка при обновлении статистики, тыкайте Никиту');
                        return;
                    }
                });
                return;
            }
    
            if  ((rarity >= 97) && (rarity <= 99)){
                //epic
                message.reply(` вызвал ${sealName} эпического качества!`);
                stats[message.author.id].epic = stats[message.author.id].epic + 1;
                client.query(`UPDATE stats SET epic=epic+1 WHERE id=${message.author.id}`, (err,res)=>{
                    if(err){
                        console.log(err,res);
                        message.channel.send('Произошла ошибка при обновлении статистики, тыкайте Никиту');
                        return;
                    }
                });
                return;
            }
    
            if  (rarity == 100){
                //legendary
                if(Random(100)==100){
                    message.reply(` вызвал ${sealName} ЗОЛОТОГО ЛЕГЕНДАРНОГО качества!`);
                    client.query(`UPDATE stats SET golden_legendary=golden_legendary+1 WHERE id=${message.author.id}`, (err,res)=>{
                        if(err){
                            console.log(err,res);
                            message.channel.send('Произошла ошибка при обновлении статистики, тыкайте Никиту');
                            return;
                        }
                    });
                    return;
                }
                message.reply(` вызвал ${sealName} легендарного качества!`);
                client.query(`UPDATE stats SET legendary=legendary+1 WHERE id=${message.author.id}`, (err,res)=>{
                    if(err){
                        console.log(err,res);
                        message.channel.send('Произошла ошибка при обновлении статистики, тыкайте Никиту');
                        return;
                    }
                });
                return;
            }
        })        
    }
}

function Random(max){
    return Math.floor(Math.random() * Math.floor(max))+1;
}