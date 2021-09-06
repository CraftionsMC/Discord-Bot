/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const {hasSelfRole, getSelfRole} = require("../Selfroles");
const client = require('../Client')

module.exports = (reaction, member) => {
    if (
        hasSelfRole(reaction.message.guild.id, reaction.emoji.name) &&
        !client.users.cache.find(u => u.id === member.id).bot
    ) {
        member.roles.remove(
            reaction.message.guild.roles.cache.find(r => r.id === getSelfRole(
                reaction.message.guild.id,
                reaction.emoji.name
            ))
        )
    }
}