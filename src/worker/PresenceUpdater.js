/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const client = require('../Client')

let enabled = true;

module.exports = {
    disable: () => {
        console.log('Disabled Presence Update', 1)
        enabled = false;
    },
    enable: () => {
        console.log('Enabled Presence Update', 1)
        enabled = true;
    },
    start: () => {

        let activities = ["Craftions Bot", process.env.PREFIX + "help", "Made by Craftions.net"];

        let index = 0;

        setInterval(() => {
            if(enabled) {
                client.user.setActivity({
                    type: "PLAYING",
                    name: activities[index]
                })
                index++;
                if(index === activities.length)
                    index = 0;
            }
        }, 2500)
    }
};