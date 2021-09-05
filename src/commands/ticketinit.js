/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");

module.exports = {
    admin: true,
    description: "Initialisiert den Ticket Kanal",
    execute: (msg) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('create-ticket')
                    .setLabel('Ticket erstellen')
                    .setStyle('PRIMARY')
            )
        msg.channel.send({
            embeds: [
                new MessageEmbed({
                    title: "Ticket erstellen",
                    color: "#1084e3",
                    description: `Erhalte direkten Support vom Team`,
                    author: {
                        name: "0erPinq Bot",
                        icon_url: "https://avatars.githubusercontent.com/u/90091315?s=200&v=4"
                    },
                    fields: [],
                    timestamp: new Date()
                })
            ],
            components: [row]
        })
    }
}