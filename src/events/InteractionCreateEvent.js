/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const {Permissions} = require("discord.js");
module.exports = (interaction) => {
    let object = JSON.parse(JSON.stringify(interaction));

    if(object.customId === 'create-ticket') {
        let category = interaction.channel.parent;
        let supportRole = interaction.guild.roles.cache.find(r => r.name.toLowerCase().includes('ticket-access'));
        if(!supportRole){
            supportRole = interaction.guild.roles.create({
                name: "Ticket-Access",
                color: "#000"
            })
        }
        let channelName = "ticket-" + interaction.user.username;

        interaction.guild.channels.create(channelName, {
            parent: category,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: interaction.guild.id,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: supportRole.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                }
            ]
        }).then(c => {
            interaction.reply({
                content: "Das Ticket wurde erstellt: <#" + c.id + ">",
                ephemeral: true
            })
        })
    }
}