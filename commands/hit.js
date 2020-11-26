module.exports = {
    name: 'hit',
    description: 'hits someone',
    execute(message, args, client){
		console.log('!hit called');
		if(args[1]){
			if(args[1]=='self'){
				message.channel.send(`${message.author} ударяет ${message.author} огромной алебардой`);
				return;
			}
			else{
				let user = getUserFromMention(args[1],client);
				if(user!=undefined){
					message.channel.send(`${message.author} ударяет ${user} огромной алебардой`);
					return;
				}
				else{
					message.channel.send(`${message.author} промахивается огромной алебардой`);
				}
			}
		}
		else{
			message.channel.send(`${message.author} промахивается огромной алебардой`);
		}
    }
}

function getUserFromMention(mention, client) {
	let ans;

	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}
		
		return client.users.cache.get(mention);;
	}
}