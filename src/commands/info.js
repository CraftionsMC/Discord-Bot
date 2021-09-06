/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const path = require("path");
const {MessageEmbed} = require("discord.js");
module.exports = {
    admin: false,
    description: "Zeigt Informationen zum Bot an",
    execute: (msg) => {
        let pkg = require(path.join(__dirname, '..', '..', 'package.json'));

        msg.channel.send({
            embeds: [
                new MessageEmbed({
                    title: "0erPinq Bot",
                    color: "#1084e3",
                    description: "Informationen zum Bot",
                    author: {
                        name: "0erPinq Bot",
                        icon_url: "https://avatars.githubusercontent.com/u/90091315?s=200&v=4"
                    },
                    fields: [
                        {
                            name: "Version",
                            inline: true,
                            value: pkg.version
                        },
                        {
                            name: "Author",
                            inline: true,
                            value: pkg.author.name
                        },
                        {
                            name: "Lizenz",
                            inline: true,
                            value: pkg.license
                        },
                        {
                            name: "Bugs",
                            inline: true,
                            value: pkg.bugs.url
                        }
                    ],
                    timestamp: new Date()
                })
            ]
        })
    }
}