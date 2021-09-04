/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const client = require('../Client')

module.exports = () => {
    console.log(`Logged in as ${client.user.tag}`)
}