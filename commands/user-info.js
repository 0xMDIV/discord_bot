module.exports = {
    name: 'user-info',
    description: 'Display Infos about the User who used the commend',
    cooldown: 5,
    aliases: ['userinfo','person'], //set aliases to execute the command even when u dont type the right name
    execute(message, args) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}\nCreated at: ${message.author.createdAt}`);
    },
};