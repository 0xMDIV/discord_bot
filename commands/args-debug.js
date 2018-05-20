module.exports = {
	name: 'debug',
	description: 'Information about the arguments provided.',
	execute(message, args) {

		if(message.member.roles.some(r=>["Admin", "Staff", "kifferbot", "Super Admin"].includes(r.name)) ) {
            // has one of the roles
			if (args[0] === 'foo') {
				return message.channel.send('bar');
			}
			message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
        } else {
            // has none of the roles
            message.channel.send("Access Denied");
        } 
	}
};