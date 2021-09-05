/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */


const Discord = require('discord.js');
const {Intents} = require("discord.js");

const client = new Discord.Client({
    partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION", "USER"],
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
});

client.login(process.env.DISCORD_BOT_TOKEN)

module.exports = client