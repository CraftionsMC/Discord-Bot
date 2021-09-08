/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const {MessageEmbed} = require("discord.js");
const {getAuthorName, getAvatarUrl, check} = require("../Util");

module.exports = async (member) => {
    let channel = member.guild.channels.cache.find(c => c.name.toLowerCase().includes('hallo'));

    if(!channel){
        console.log("Could not find Welcome Channel in Guild " + member.guild.id + ". Creating new...")
        channel = await member.guild.channels.create("hallo")
    }

    if(check(process.env.ENABLE_WELCOME)) {
        channel.send({
            embeds: [
                new MessageEmbed({
                    title: "Willkommen",
                    color: "#1084e3",
                    description: "Willkommen <@" + member.id + "> auf dem Discord server von " + member.guild.name + "!",
                    author: {
                        name: getAuthorName(),
                        icon_url: getAvatarUrl()
                    },
                    timestamp: new Date()
                })
            ]
        })
    }

    require('./MemberStats').update(member.guild).then(r => delete require.cache[require.resolve('./MemberStats')]);
}