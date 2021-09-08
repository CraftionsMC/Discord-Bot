/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const {MessageEmbed} = require("discord.js");
const {getAuthorName, getAvatarUrl} = require("../Util");
module.exports = {
    execute: (msg) => {
        if (msg.mentions.members.first()) {
            msg.mentions.members.first().ban();
            console.log(`Banned user ${msg.mentions.members.first().user.tag} <${msg.mentions.members.first().user.id}>`)
            msg.channel.send({
                embeds: [
                    new MessageEmbed({
                        title: "Erfolgreich",
                        color: "#10e83b",
                        description: `Der Nutzer wurde erfolgreich gebannt!`,
                        author: {
                            name: getAuthorName(),
                            icon_url: getAvatarUrl()
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
                        description: `Du musst den Nutzer den du bannen willst pingen!`,
                        author: {
                            name: getAuthorName(),
                            icon_url: getAvatarUrl()
                        },
                        timestamp: new Date()
                    })
                ]
            })
        }
    },
    admin: true,
    description: "Banne einen Nutzer"
}