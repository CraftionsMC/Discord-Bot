/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
const {check} = require("../Util");

async function update(guild) {
    if(check(process.env.ENABLE_STATS)) {
        let channel = guild.channels.cache.find(c => c.name.toLowerCase().includes('member'));

        if(!channel){
            console.log("Could not find Member Stats Channel in Guild " + guild.id + ". Creating new...")
            channel = await guild.channels.create("member", {
                type: "GUILD_VOICE"
            })
        }

        let newName = channel.name;

        newName = newName.replace(/\d+/g, " ")

        newName += guild.memberCount


        await channel.setName(newName);
    }
}

module.exports = {update}