/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const {MessageEmbed} = require("discord.js");
const {getAuthorName, getAvatarUrl} = require("../Util");
module.exports = {
    admin: false,
    description: "Verwalte Tickets",
    execute: (msg) => {
        let args = msg.content.split(" ");
        if (args.length === 1 || args[1] === 'help') {
            sendHelp();
        } else {
            switch (args[1]) {
                case "delete":
                    if (checkChannelType()) {
                        msg.channel.delete();
                    } else {
                        sendNoTicket();
                    }
                    break;
                case "archive":
                    if (checkChannelType()) {
                        let supportRole = msg.guild.roles.cache.find(r => r.name.toLowerCase().includes('ticket-access'));
                        msg.channel.setName('archived-' + msg.channel.name).then(() => {
                            msg.channel.permissionOverwrites.set([
                                {
                                    id: supportRole.id,
                                    allow: ['VIEW_CHANNEL']
                                },
                                {
                                    id: msg.guild.id,
                                    deny: ['VIEW_CHANNEL']
                                }
                            ]).then(() => {
                                msg.channel.send({
                                    embeds: [
                                        new MessageEmbed({
                                            title: "Ticket archiviert",
                                            color: "#1084e3",
                                            description: `Das Ticket wurde archiviert!`,
                                            author: {
                                                name: getAuthorName(),
                                                icon_url: getAvatarUrl()
                                            },
                                            timestamp: new Date()
                                        })
                                    ]
                                })
                            })
                        })
                    } else {
                        sendNoTicket();
                    }
                    break;
                default:
                    sendHelp();
            }
        }

        function sendHelp() {
            msg.channel.send({
                embeds: [
                    new MessageEmbed({
                        title: "Nutzung",
                        color: "#1084e3",
                        description: `Nutzung dieses Befehls: ${process.env.PREFIX}ticket <help|delete|archive>`,
                        author: {
                            name: getAuthorName(),
                            icon_url: getAvatarUrl()
                        },
                        timestamp: new Date()
                    })
                ]
            })
        }

        function sendNoTicket() {
            msg.channel.send({
                embeds: [
                    new MessageEmbed({
                        title: "Fehler",
                        color: "#e81010",
                        description: `Dieser Befehl funktioniert nur in Ticket Kanälen!`,
                        author: {
                            name: getAuthorName(),
                            icon_url: getAvatarUrl()
                        },
                        timestamp: new Date()
                    })
                ]
            })
        }

        function checkChannelType() {
            return msg.channel.name.includes('ticket');
        }
    }
}