/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

console.log('\n' +
    '\n' +
    '_______              __________.__               \n' +
    '\\   _  \\   __________\\______   \\__| ____   ______\n' +
    '/  /_\\  \\_/ __ \\_  __ \\     ___/  |/    \\ / ____/\n' +
    '\\  \\_/   \\  ___/|  | \\/    |   |  |   |  < <_|  |\n' +
    ' \\_____  /\\___  >__|  |____|   |__|___|  /\\__   |\n' +
    '       \\/     \\/                       \\/    |__|\n' +
    '__________ ________   __                         \n' +
    '\\______   \\\\_____  \\_/  |_                       \n' +
    ' |    |  _/ /   |   \\   __\\                      \n' +
    ' |    |   \\/    |    \\  |                        \n' +
    ' |______  /\\_______  /__|                        \n' +
    '        \\/         \\/                            \n' +
    '\n' +
    'Made by MCTzOCK')

require('dotenv').config();

require('./Client');

require('./worker/Workers')

require('./EventDispatcher')