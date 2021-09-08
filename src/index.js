/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

console.log('\n' +
    '\n' +
    '_________                _____  __  .__                      \n' +
    '\\_   ___ \\____________ _/ ____\\/  |_|__| ____   ____   ______\n' +
    '/    \\  \\/\\_  __ \\__  \\\\   __\\\\   __\\  |/  _ \\ /    \\ /  ___/\n' +
    '\\     \\____|  | \\// __ \\|  |   |  | |  (  <_> )   |  \\\\___ \\ \n' +
    ' \\______  /|__|  (____  /__|   |__| |__|\\____/|___|  /____  >\n' +
    '        \\/            \\/                           \\/     \\/ \n' +
    '__________        __                                         \n' +
    '\\______   \\ _____/  |_                                       \n' +
    ' |    |  _//  _ \\   __\\                                      \n' +
    ' |    |   (  <_> )  |                                        \n' +
    ' |______  /\\____/|__|                                        \n' +
    '        \\/                                                   \n' +
    '\n' +
    'Made by Craftions.net\n')

require('./Logger')

process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception: ' + err.stack, 2)
})

process.on('exit', exitHandler)
process.on('SIGINT', exitHandler)
process.on('SIGUSR1', exitHandler)
process.on('SIGUSR2', exitHandler)

function exitHandler() {
    console.log("Saving log file...")
    require('./Logger').Logger.save();
    process.exit();
}

require('dotenv').config();

require('./Client');

require('./worker/Workers')
require('./EventDispatcher')

require('./Levels')
require('./Selfroles')