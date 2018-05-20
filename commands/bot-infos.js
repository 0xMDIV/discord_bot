module.exports = {
    name: 'bot-info',
    description: 'Display Infos about the Bot',
    cooldown: 5,
    execute(message, args) {

        message.channel.send(`The Bot was created by MDIV\nCreated at: 10.05.2018`); //message.author.bot
    },
};