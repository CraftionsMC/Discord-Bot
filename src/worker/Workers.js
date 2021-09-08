/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const PresenceUpdater = require('./PresenceUpdater');
const Birthdays = require('./Birthdays')
const {check} = require("../Util");

if(check(process.env.ENABLE_BIRTHDAYS)) {
    Birthdays.start();
}

PresenceUpdater.start();

module.exports = {
    PresenceUpdater,
    Birthdays
}