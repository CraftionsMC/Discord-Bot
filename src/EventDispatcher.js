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