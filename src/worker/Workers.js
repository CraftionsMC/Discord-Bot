/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const PresenceUpdater = require('./PresenceUpdater');
const Birthdays = require('./Birthdays')

PresenceUpdater.start();
Birthdays.start();

module.exports = {
    PresenceUpdater,
    Birthdays
}