/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const {MessageEmbed} = require("discord.js");
const Levels = require('../Levels')
const {getAuthorName, getAvatarUrl, check} = require("../Util");
module.exports = {
    admin: false,
    description: "Zeigt deinen Rang an",
    execute: (msg) => {
        if(check(process.env.ENABLE_LEVELS)) {
            msg.channel.send({
                embeds: [
                    new MessageEmbed({
                        title: "Pinq",
                        color: "#1084e3",
                        description: `Du hast aktuell einen ${Levels.getLevel(msg.author.id)} Pinq!`,
                        author: {
                            name: getAuthorName(),
                            icon_url: getAvatarUrl()
                        },
                        fields: [],
                        timestamp: new Date()
                    })
                ]
            })
        }
    }
}