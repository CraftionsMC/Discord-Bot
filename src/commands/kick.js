/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const {MessageEmbed} = require("discord.js");
module.exports = {
    execute: (msg) => {
        if (msg.mentions.members.first()) {
            msg.mentions.members.first().kick();
            msg.channel.send({
                embeds: [
                    new MessageEmbed({
                        title: "Erfolgreich",
                        color: "#10e83b",
                        description: `Der Nutzer wurde erfolgreich gekickt!`,
                        author: {
                            name: "0erPinq Bot",
                            icon_url: "https://avatars.githubusercontent.com/u/90091315?s=200&v=4"
                        },
                        timestamp: new Date()
                    })
                ]
            })
        } else {
            msg.channel.send({
                embeds: [
                    new MessageEmbed({
                        title: "Fehler",
                        color: "#e81010",
                        description: `Du musst den Nutzer den du kicken willst pingen!`,
                        author: {
                            name: "0erPinq Bot",
                            icon_url: "https://avatars.githubusercontent.com/u/90091315?s=200&v=4"
                        },
                        timestamp: new Date()
                    })
                ]
            })
        }
    },
    admin: true,
    description: "Kicke einen Nutzer"
}