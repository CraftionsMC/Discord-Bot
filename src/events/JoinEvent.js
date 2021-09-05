/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const {MessageEmbed} = require("discord.js");

module.exports = async (member) => {
    let channel = member.guild.channels.cache.find(c => c.name.toLowerCase().includes('hallo'));

    if(!channel){
        console.log("Could not find Welcome Channel in Guild " + member.guild.id + ". Creating new...")
        channel = await member.guild.channels.create("hallo")
    }

    channel.send({
        embeds: [
            new MessageEmbed({
                title: "Willkommen",
                color: "#1084e3",
                description: "Willkommen <@" + member.id + "> auf dem Community Discord Server von 0erPinq!",
                author: {
                    name: "0erPinq Bot",
                    icon_url: "https://avatars.githubusercontent.com/u/90091315?s=200&v=4"
                },
                timestamp: new Date()
            })
        ]
    })

    require('./MemberStats').update(member.guild).then(r => delete require.cache[require.resolve('./MemberStats')]);
}