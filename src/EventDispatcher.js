/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const client = require('./Client');

client.on('ready', () => {
    require('./events/ReadyEvent')();
})

client.on('messageCreate', (args) => {
    require('./events/MessageEvent')(args);
})

client.on('interactionCreate', (interaction) => {
    require('./events/InteractionCreateEvent')(interaction)
})

client.on('guildMemberAdd', member => {
    require('./events/JoinEvent')(member)
})

client.on('guildMemberRemove', member => {
    require('./events/LeaveEvent')(member)
})

client.on('rateLimit', (data) => {
    console.log(data)
})