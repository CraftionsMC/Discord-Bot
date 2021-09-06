/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
const {addSelfRole, removeSelfRole} = require("../Selfroles");
const {MessageEmbed} = require("discord.js");

function sendHelp(msg) {
    msg.channel.send({
        embeds: [
            new MessageEmbed({
                title: "Fehler!",
                color: "#e81010",
                description: "Nutzung: " + process.env.PREFIX + "selfroles <add|delete> <:emoji:> <@role>",
                author: {
                    name: "0erPinq Bot",
                    icon_url: "https://avatars.githubusercontent.com/u/90091315?s=200&v=4"
                },
                timestamp: new Date()
            })
        ]
    })
}

module.exports = {
    admin: true,
    description: "Verwalte die Selfroles auf diesem Server",
    execute: (msg) => {
        if (msg.content.split(" ").length !== 4) {
            sendHelp(msg);
        } else {
            let type = msg.content.split(" ")[1];
            let emoji = msg.content.split(" ")[2];
            let role = msg.mentions.roles.first();

            if(type === "add") {
                addSelfRole(role.id, msg.guild.id, emoji);
            } else {
                removeSelfRole(role.id, msg.guild.id, emoji);
            }
            msg.channel.send({
                embeds: [
                    new MessageEmbed({
                        title: "Erfolgreich!",
                        color: "#10e83b",
                        description: "Die Selfrole wurde erstellt/gelöscht",
                        author: {
                            name: "0erPinq Bot",
                            icon_url: "https://avatars.githubusercontent.com/u/90091315?s=200&v=4"
                        },
                        timestamp: new Date()
                    })
                ]
            })
        }
    }
}