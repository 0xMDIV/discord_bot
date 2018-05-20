module.exports = {
    name: 'blunt',
    description: 'Kick a User',
    guildOnly: true,
    execute(message, args) {
        //if no user tagged
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user!');
        }
        //grab the first mentioned user from the message
        //this will return a 'User' object, just like message.author
        const taggedUser = message.mentions.users.first();
        //taggedUser.kick();
        message.channel.send(`You wanted to share a blunt with ${taggedUser}`);
        console.log(`Hit one up for ${taggedUser.username}, lets smoke!`);
    },
};