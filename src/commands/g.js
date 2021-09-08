/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const path = require("path");
const {MessageEmbed} = require("discord.js");
const {getAuthorName, getAvatarUrl} = require("../Util");

module.exports = {
    admin: false,
    description: "Setze deinen Geburtstag",
    execute: (msg) => {
        let config = {};
        if (fs.existsSync(path.join(__dirname, '..', '..', 'private', 'birthdays.json'))) {
            config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'private', 'birthdays.json')).toString());
        } else {
            if (!fs.existsSync(path.join(__dirname, '..', '..', 'private'))) {
                fs.mkdirSync(path.join(__dirname, '..', '..', 'private'))
            }
            fs.writeFileSync(path.join(__dirname, '..', '..', 'private', 'birthdays.json'), JSON.stringify({}))
        }

        const args = msg.content.split(" ");

        if (args.length === 1) {
            sendError();
        } else {
            if (args[1].length === 5 && args[1].charAt(2) === '.') {
                config[msg.author.id] = args[1];
                fs.writeFileSync(path.join(__dirname, '..', '..', 'private', 'birthdays.json'), JSON.stringify(config));
                msg.channel.send({
                    embeds: [
                        new MessageEmbed({
                            title: "Erfolgreich",
                            color: "#10e83b",
                            description: `Dein Geburtstag wurde gesetzt!`,
                            author: {
                                name: getAuthorName(),
                                icon_url: getAvatarUrl()
                            },
                            timestamp: new Date()
                        })
                    ]
                })
            } else {
                sendError();
            }
        }

        function sendError() {
            msg.channel.send({
                embeds: [
                    new MessageEmbed({
                        title: "Fehler",
                        color: "#e81010",
                        description: `Du musst deinen Geburtstag (00.00) angeben!`,
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
}