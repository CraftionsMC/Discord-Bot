/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const {MessageEmbed} = require("discord.js");
const Levels = require('../Levels')
module.exports = {
    admin: false,
    description: "Zeigt deinen Rang an",
    execute: (msg) => {
        msg.channel.send({
            embeds: [
                new MessageEmbed({
                    title: "Pinq",
                    color: "#1084e3",
                    description: `Du hast aktuell einen ${Levels.getLevel(msg.author.id)} Pinq!`,
                    author: {
                        name: "0erPinq Bot",
                        icon_url: "https://avatars.githubusercontent.com/u/90091315?s=200&v=4"
                    },
                    fields: [],
                    timestamp: new Date()
                })
            ]
        })
    }
}