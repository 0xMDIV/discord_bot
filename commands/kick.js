module.exports = {
    name: 'kick',
    description: 'Kick a User',
    guildOnly: true,
    usage: ['command name'],
    userPermissions: ['KICK_MEMBERS'],
    cooldown: 5,
    execute(message, args) {
        
        //if no user tagged
        if (!message.mentions.users.size > 0) {
            return message.reply('you need to tag a user in order to kick them!');
        }

        // Easy way to get member object though mentions.
        var member = message.mentions.members.first();
        // slice(1) removes the first part, which here should be the user mention or ID
        // join(' ') takes all the various parts to make it a single string.
        let reason = args.slice(1).join(' ');
        //if(!reason) reason = "No reason provided";

        // Check if they have one of many roles
        if(message.member.roles.some(r=>["Admin", "Staff", "kifferbot", "Super Admin"].includes(r.name)) ) {
            // has one of the roles
            member.kick(reason).then(member => {
                if(reason) {
                    message.channel.send(":wave:" + member.displayName + " has been successfully kicked for: " + reason);
                    console.log(member.displayName + " has just been kicked for " + reason);
                } else {
                    message.channel.send(":wave:" + member.displayName + " has been successfully kicked");
                    console.log(member.displayName + " has just been kicked (no extra reason provided)");
                }
            });
        } else {
            // has none of the roles
            message.channel.send("Access Denied");
            console.log(message.author.tag + " has just tried to kick " + member.displayName);
            
        } 
    }
};
