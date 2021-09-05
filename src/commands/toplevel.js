/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const {MessageEmbed} = require("discord.js");
const Levels = require('../Levels')
module.exports = {
    admin: false,
    description: "Zeigt die Zehn Nutzer mit den Besten Pinqs an",
    execute: (msg) => {
        let levelsUnsorted = {};

        Object.keys(Levels.getRaw()).forEach(k => {
            let o = Levels.getRaw()[k];
            if(!levelsUnsorted[o.level]) {
                levelsUnsorted[o.level] = [];
            }
            levelsUnsorted[o.level].push({
                id: k,
                xp: o.xp
            })
        })

        const levelsSorted = Object.keys(levelsUnsorted).sort().reduce(
            (obj, key) => {
                obj[key] = levelsUnsorted[key];
                return obj;
            },
            {}
        );

        let data = {
            title: "Top Levels",
            color: "#10e83b",
            description: `Die Nutzer mit dem niedrigsten Pinq`,
            author: {
                name: "0erPinq Bot",
                icon_url: "https://avatars.githubusercontent.com/u/90091315?s=200&v=4"
            },
            fields: [],
            timestamp: new Date()
        }

        levelsSorted[Object.keys(levelsSorted)[0]].forEach(l => {
            data.fields.push({
                name: Levels.getLevel(l.id) + " Pinq",
                inline: true,
                value: "<@!" + l.id + ">"
            })
        })

        if(data.fields.length === 0) delete data.fields;

        msg.channel.send({
            embeds: [
                new MessageEmbed(data)
            ]
        })
    }
}