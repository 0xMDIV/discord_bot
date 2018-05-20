//Made by MDIV
//After this guide: https://discordjs.guide/#/creating-your-bot/

//start with typing inside an console window     node .

// require the discord.js module and import prefix and token from config.json
const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection(); //cooldowns to prevent spamm from users

//implement sqlite yay
//const sql = require("sqlite");
//sql.open("./database.sqlite");

//setup bot specific infos
//client.user.setAvatar(`./imgs/avatar.png`);


//get all files from our folder "commands"
const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    console.log(`rifk7 Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    //bot setup
    client.user.setUsername('rifk7');
    client.user.setActivity('Helping the Users');
});
client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`rifk7 Bot has been Removed or Discord got Deleted: ${guild.name} (id: ${guild.id})`);
  });

//#region - Listening and replying to messages -
client.on('message', message => {
    //has the message our prefix or is the message author the bot? then return
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    //define args, commandName
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    //if there is no matching command, return.
    if (!client.commands.has(commandName)) return;

    //define command as original object and make it able to get called with the use of aliases
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    //is commend only useable on a Server?
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('You can use this Commend only on a Server!');
    }
    //when args is set to true, perform the check
    if(command.args && !args.length) {
        //return message.channel.send(`You didnt provide any arguments, ${message.author}`);
        //Expected command usage - better then that above
        let reply = `You didnt provide any arguments, ${message.author}!`;

        //show proper usage
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    } 

  
    //#region - Cooldowns -
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now(); //get time
    const timestamps = cooldowns.get(command.name); //get names of triggered commands
    const cooldownAmount = (command.cooldown || 10) * 1000; //get cooldown amount, if non is set default is 25 seconds, then convert it to mili seconds with * 1000

    if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    else {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    //#endregion
    
    try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
    }
});
//#endregion

//#region - important to use in the commands folder
/* 
    cooldown: 5, //set cooldown amount for the command to 5 seconds
    aliases: ['info','information'], //set aliases which makes it easier to call an command even when not the exact name is used
*/
//#endregion

// login to Discord with your app's token defined at the start as TOKEN
client.login(token);

