/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const Discord = require('discord.js')
const client = require('../Client')
const {MessageEmbed} = require("discord.js");

module.exports = {
    admin: true,
    description: "Erstelle Giveaways!",
    execute: (msg) => {
        if (msg.content.split(" ").length >= 3) {

            let date = new Date();
            let realArgs = [];
            for (let i = 2; i < msg.content.split(" ").length; i++) {
                realArgs.push(msg.content.split(" ")[i])
            }
            let prize = realArgs.join(' ');
            date.setHours(date.getHours() + (parseInt(msg.content.split(" ")[1]) * 1000 * 60))
            let embed = new Discord.MessageEmbed()
                .setTitle("Gewinnspiel von " + msg.author.tag)
                .setDescription("Preis: ``" + prize + "``")
                .setAuthor("Giveaway 🎁")
                .setColor('#1084e3')
                .setFooter("Endet um")
                .setTimestamp(Date.now() + ((parseInt(msg.content.split(" ")[1]) * 1000 * 60)));
            msg.channel.send({embeds: [embed]}).then(async m => {
                m.react('🎁')
                setTimeout(() => {

                    m.reactions.cache.get('🎁').users.fetch().then(u => {

                        let object = JSON.parse(JSON.stringify(u));

                        let user;


                        if (object.length > 1) {
                            let r = getRandomInt(0, object.length);
                            while (object[r].bot) {
                                r = getRandomInt(0, object.length);
                            }

                            user = object[r];

                            msg.channel.send({
                                content: "Gewinner: <@" + user.id + "> HGW!"
                            })
                        } else {
                            msg.channel.send({
                                content: "Es konnte kein Gewinner ausgelost werden!"
                            })
                        }


                        function getRandomInt(min, max) {
                            min = Math.ceil(min);
                            max = Math.floor(max);
                            return Math.floor(Math.random() * (max - min + 1)) + min;
                        }
                    })

                }, (parseInt(msg.content.split(" ")[1]) * 1000 * 60))
            });

        } else {
            msg.channel.send({
                embeds: [
                    new MessageEmbed({
                        title: "Fehler",
                        color: "#e81010",
                        description: `Du musst die Zeit (in Minuten) als auch den Gewinn angeben!`,
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