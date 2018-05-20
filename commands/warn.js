module.exports = {
    name: 'warn',
    description: 'Warn a User',
    guildOnly: true,
    usage: ['command @Username'],
    execute(message, args) {
        //if no user tagged
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to warn them!');
        }
        //warn level
        var warnLvL = 0;
        let reason = args.slice(1).join(' ');
       
        if(!reason) reason = "No reason provided";
        
        //grab the first mentioned user from the message
        //this will return a 'User' object, just like message.author
        const taggedUser = message.mentions.users.first();    
        message.channel.send(`${taggedUser} you have been warned! ` + reason);
        

        console.log('Warned User: ' + taggedUser.username + reason);
    },
};