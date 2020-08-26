module.exports = {
    name: 'hit',
    description: 'hits someone',
    execute(message, args, client){
		console.log('!hit called');
		if(args[1]){
			if(args[1]=='self'){
				message.channel.send(`${message.author} hits ${message.author} with a giant halberd`);
				return;
			}
			else{
				let user = getUserFromMention(args[1],client);
				if(user!=undefined){
					message.channel.send(`${message.author} hits ${user} with a giant halberd`);
					return;
				}
				else{
					message.channel.send(`${message.author} misses with a giant halberd`);
				}
			}
		}
		else{
			message.channel.send(`${message.author} misses with a giant halberd`);
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