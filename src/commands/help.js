/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const {MessageEmbed} = require("discord.js");
const path = require("path");
const {getAuthorName, getAvatarUrl} = require("../Util");
module.exports = {
    admin: false,
    description: "Zeigt Hilfe für einen Befehl an.",
    execute: (msg) => {

        let commands = [];

        fs.readdirSync(__dirname).forEach(f => {
            if (f.endsWith('.js')) {
                const cmd = require(path.join(__dirname, f));

                if (cmd.admin) {
                    if (msg.member.permissions.has('ADMINISTRATOR')) {
                        commands.push({
                            name: f.split(".js")[0],
                            description: cmd.description
                        })
                    }
                } else {
                    commands.push({
                        name: f.split(".js")[0],
                        description: cmd.description
                    })
                }

                delete require.cache[require.resolve(path.join(__dirname, f))];
            }
        })

        let data = {
            title: "Hilfe",
            color: "#1084e3",
            description: `Hilfe zu allen Befehlen auf die du Zugriff hast`,
            author: {
                name: getAuthorName(),
                icon_url: getAvatarUrl()
            },
            fields: [],
            timestamp: new Date()
        }

        commands.forEach(command => {
            data.fields.push({
                name: process.env.PREFIX + command.name,
                inline: true,
                value: command.description
            })
        })

        msg.channel.send({
            embeds: [
                new MessageEmbed(data)
            ]
        })

    }
}