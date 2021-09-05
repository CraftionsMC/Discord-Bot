/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const client = require('../Client')
const fs = require("fs");
const path = require("path");
const {MessageEmbed} = require("discord.js");

module.exports = (msg) => {
    if (msg.author.bot) return;

    if (msg.content.startsWith(process.env.PREFIX)) {
        let command = msg.content.split(" ")[0].split(process.env.PREFIX)[1];

        console.log(`Got command ${process.env.PREFIX + command} from ` + msg.author.tag + " <" + msg.author.id + ">")

        if (fs.existsSync(path.join(__dirname, '..', 'commands', command + '.js'))) {

            let mod;

            try {
                mod = require(path.join(__dirname, '..', 'commands', command + '.js'));
            } catch(e) {
                console.log(`Could not load command ${process.env.PREFIX + command}:\n${e}`, 2)
            }

            if (!mod.admin) {
                mod.execute(msg);
            } else {
                if (msg.member.permissions.has('ADMINISTRATOR')) {
                    mod.execute(msg);
                } else {
                    msg.channel.send({
                        embeds: [
                            new MessageEmbed({
                                title: "Fehler",
                                color: "#e81010",
                                description: `Der Befehl \`\`${command}\`\` benötigt Administrator Berechtigungen.`,
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

            delete require.cache[require.resolve(path.join(__dirname, '..', 'commands', command + '.js'))]
        } else {
            console.log(`Could not find the command ${process.env.PREFIX + command}`, 1)
            msg.channel.send({
                embeds: [
                    new MessageEmbed({
                        title: "Fehler",
                        color: "#e81010",
                        description: `Der Befehl \`\`${command}\`\` konnte nicht gefunden werden.`,
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