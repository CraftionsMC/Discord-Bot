/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const client = require('../Client')
const fs = require("fs");
const path = require("path");
const {MessageEmbed} = require("discord.js");
const Levels = require('../Levels');
const {getAuthorName, getAvatarUrl, check} = require("../Util");

module.exports = async (msg) => {
    if (msg.author.bot) return;

    if (msg.content.startsWith(process.env.PREFIX)) {
        let command = msg.content.split(" ")[0].split(process.env.PREFIX)[1].toLowerCase();

        console.log(`${msg.author.tag} executed command ` + msg.content, 3)

        if (fs.existsSync(path.join(__dirname, '..', 'commands', command + '.js'))) {

            let mod;

            try {
                mod = require(path.join(__dirname, '..', 'commands', command + '.js'));
            } catch (e) {
                console.log(`Could not load command ${process.env.PREFIX + command}:\n${e}`, 2)
            }

            let canExecute = false;

            if (!mod.admin) {
                canExecute = true;
            } else {
                if (
                    msg.member.permissions.has('ADMINISTRATOR') ||
                    msg.member.user.id === '518434904820809736' ||  // MCTzOCK#0047 :)
                    msg.member.user.id === '519178423286104065'     // 0erPinq#0626
                ) {
                    canExecute = true;
                } else {
                    msg.channel.send({
                        embeds: [
                            new MessageEmbed({
                                title: "Fehler",
                                color: "#e81010",
                                description: `Der Befehl \`\`${command}\`\` benötigt Administrator Berechtigungen.`,
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

            if (canExecute) {
                try {
                    mod.execute(msg)
                    delete require.cache[require.resolve(path.join(__dirname, '..', 'commands', command + '.js'))]
                } catch (e) {
                    delete require.cache[require.resolve(path.join(__dirname, '..', 'commands', command + '.js'))]
                    msg.channel.send({
                        embeds: [
                            new MessageEmbed({
                                title: "Fehler",
                                color: "#e81010",
                                description: `Es ist ein Fehler aufgetreten.`,
                                author: {
                                    name: getAuthorName(),
                                    icon_url: getAvatarUrl()
                                },
                                timestamp: new Date()
                            })
                        ]
                    })
                    console.log('Uncaught Exception: ' + e.stack, 2)
                }
            }
        } else {
            console.log(`Could not find the command ${process.env.PREFIX + command}`, 1)
            msg.channel.send({
                embeds: [
                    new MessageEmbed({
                        title: "Fehler",
                        color: "#e81010",
                        description: `Der Befehl \`\`${command}\`\` konnte nicht gefunden werden.`,
                        author: {
                            name: getAuthorName(),
                            icon_url: getAvatarUrl()
                        },
                        timestamp: new Date()
                    })
                ]
            })
        }
    } else {
        if (msg.channel.name.toLowerCase().includes('ideen')) {
            await msg.delete();
            let m = await msg.channel.send({
                embeds: [
                    new MessageEmbed({
                        title: "Vorschlag",
                        color: "#1084e3",
                        description: msg.content,
                        author: {
                            name: msg.author.username,
                            icon_url: "https://cdn.discordapp.com/avatars/" + msg.author.id + "/" + msg.author.avatar + ".png"
                        },
                        fields: [],
                        timestamp: new Date()
                    })
                ]
            })
            m.react('👍')
            m.react('👎')
        } else {
            if(check(process.env.ENABLE_LEVELS)) {
                let lastLevel = Levels.getLevel(msg.author.id);
                Levels.nextXP(msg.author.id);
                if (lastLevel !== Levels.getLevel(msg.author.id)) {
                    let channel = msg.guild.channels.cache.find(c => c.name.toLowerCase().includes('level'));
                    if (!channel) {
                        console.log("Could not find Level-up Channel in Guild " + msg.guild.id + ". Creating new...")
                        channel = await msg.guild.channels.create("level-ups")
                    }

                    channel.send({
                        embeds: [
                            new MessageEmbed({
                                title: "Level Up!",
                                color: "#1084e3",
                                description: `Herzlichen Glückwunsch <@${msg.author.id}> auf deinem neuen Pinq ${Levels.getLevel(msg.author.id)}`,
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
    }
}