//implement sqlite yay
const sql = require("sqlite");
sql.open("./rifkBotDatabase.sqlite");

module.exports = {
    name: 'coins',
    description: 'Display the users Kifferking-Coins',
    cooldown: 60,
    execute(message, args) {

        //message.channel.send(`The Bot was created by MDIV\nCreated at: 10.05.2018`); //message.author.bot

       sql.get(`SELECT * FROM coinSystem WHERE userID ="${message.author.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO coinSystem (userID, coins, level) VALUES (?, ?, ?)", [message.author.id, 0, 1]); //wenn user nicht existiert, dann ist das der standart
        } else {
            sql.run(`UPDATE coinSystem SET coins = ${row.coins + 1} WHERE userID = ${message.author.id}`);
            message.reply("You have now coins: " + row.coins);
            console.log(row.coins);
        }
        }).catch(() => {
            console.error;
            sql.run("CREATE TABLE IF NOT EXISTS coinSystem ( `userID` INTEGER NOT NULL, `coins` INTEGER, `level` INTEGER, PRIMARY KEY(`userID`) )").then(() => {
            sql.run("INSERT INTO coinSystem (userID, coins, level) VALUES (?, ?, ?)", [message.author.id, 0, 1]);
            })
        })
    }
};

//CREATE TABLE "coinSystem" ( `userID` INTEGER NOT NULL UNIQUE, `coins` INTEGER, `level` INTEGER, PRIMARY KEY(`userID`) )