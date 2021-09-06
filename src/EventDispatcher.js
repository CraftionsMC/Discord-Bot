/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const client = require('./Client');

client.on('ready', () => {
    require('./events/ReadyEvent')();
    delete require.cache[require.resolve('./events/ReadyEvent')]
})

client.on('messageCreate', (args) => {
    require('./events/MessageEvent')(args);
    delete require.cache[require.resolve('./events/MessageEvent')]
})

client.on('interactionCreate', (interaction) => {
    require('./events/InteractionCreateEvent')(interaction)
    delete require.cache[require.resolve('./events/InteractionCreateEvent')]
})

client.on('guildMemberAdd', member => {
    require('./events/JoinEvent')(member)
    delete require.cache[require.resolve('./events/JoinEvent')]
})

client.on('guildMemberRemove', member => {
    require('./events/LeaveEvent')(member)
    delete require.cache[require.resolve('./events/LeaveEvent')]
})

client.on('messageReactionAdd', (reaction, member) => {
    require('./events/ReactionAddEvent')(reaction, reaction.message.guild.members.cache.find(m => m.id === member.id))
    delete require.cache[require.resolve('./events/ReactionAddEvent')]
})

client.on('messageReactionRemove', (reaction, member) => {
    require('./events/ReactionRemoveEvent')(reaction, reaction.message.guild.members.cache.find(m => m.id === member.id))
    delete require.cache[require.resolve('./events/ReactionRemoveEvent')]
})