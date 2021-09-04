/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const client = require('../Client')

let enabled = true;

module.exports = {
    disable: () => {
        enabled = false;
    },
    enable: () => {
        enabled = true;
    },
    start: () => {

        let activities = ["Zerstört SkyWars auf Gomme", "Made by MCTzOCK#0047", "0erPinq Bot"];

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
        }, 2000)
    }
};