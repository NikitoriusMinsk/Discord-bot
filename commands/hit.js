module.exports = {
    name: 'hit',
    description: 'hits someone',
    execute(message, args, client){
        message.channel.send(`${message.author} ударяет ${getUserFromMention(args[1],client)}`);
    }
}

function getUserFromMention(mention, client) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}