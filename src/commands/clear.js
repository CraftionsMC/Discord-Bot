/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const {MessageEmbed} = require("discord.js");
const {getAuthorName, getAvatarUrl} = require("../Util");
module.exports = {
    execute: (msg) => {
        if (msg.content.split(" ").length !== 2) {
            msg.channel.send({
                embeds: [
                    new MessageEmbed({
                        title: "Fehler",
                        color: "#e81010",
                        description: `Du musst die Anzahl der Nachrichten die gelöscht werden sollen angeben!`,
                        author: {
                            name: getAuthorName(),
                            icon_url: getAvatarUrl()
                        },
                        timestamp: new Date()
                    })
                ]
            })
        } else {
            if (parseInt(msg.content.split(" ")[1])) {
                console.log(`Deleted ${msg.content.split(" ")[1]} messages in ${msg.channel.name} <${msg.channel.id}>`)
                msg.channel.bulkDelete(parseInt(msg.content.split(" ")[1])).then((e) => {
                    msg.channel.send({
                        embeds: [
                            new MessageEmbed({
                                title: "Erfolgreich",
                                color: "#10e83b",
                                description: `Die Nachrichten wurden gelöscht!`,
                                author: {
                                    name: getAuthorName(),
                                    icon_url: getAvatarUrl()
                                },
                                timestamp: new Date()
                            })
                        ]
                    })
                });
            } else {
                msg.channel.send({
                    embeds: [
                        new MessageEmbed({
                            title: "Fehler",
                            color: "#e81010",
                            description: `Die Anzahl muss eine Zahl sein!`,
                            author: {
                                name: getAuthorName(),
                                icon_url: getAvatarUrl()
                            },
                            timestamp: new Date()
                        })
                    ]
                })
            }
        }
    },
    admin: true,
    description: "Lösche Nachrichten"
}