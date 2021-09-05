/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const path = require("path");
const client = require('../Client')

module.exports = {
    start: () => {
        setTimeout(() => {
            checkBirthdays();
            setTimeout(checkBirthdays, 1000 * 60 * 60 * 24)
        }, 5000)

        function checkBirthdays() {

            let config = {};
            if (fs.existsSync(path.join(__dirname, '..', '..', 'private', 'birthdays.json'))) {
                config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'private', 'birthdays.json')).toString());
            } else {
                console.log("The birthdays configuration file was not found. Creating blank...", 1)
                if (!fs.existsSync(path.join(__dirname, '..', '..', 'private'))) {
                    fs.mkdirSync(path.join(__dirname, '..', '..', 'private'))
                }
                fs.writeFileSync(path.join(__dirname, '..', '..', 'private', 'birthdays.json'), JSON.stringify({}))
            }

            let day = new Date().getDate().toString();
            if(day.length === 1)
                day = "0" + day;
            let month = (new Date().getMonth() + 1).toString();
            if(month.length === 1)
                month = "0" + month;

            let parsedDay = day + "." + month;
            console.log('Checking for birthdays for today, ' + parsedDay)

            let users = [];

            Object.keys(config).forEach(k => {
                if (config[k] === parsedDay) {
                    users.push(k)
                }
            })

            if (users.length === 0) {
                console.log("Today are no birthdays");
            } else {
                console.log("Birthdays Today: " + users);
            }

            client.guilds.cache.forEach(guild => {
                let channel = guild.channels.cache.find(c => c.name.toLowerCase().includes('geburtstag'));
                if (channel) {
                    users.forEach(user => {
                        channel.send({
                            content: "HGW <@" + user + "> zum Geburtstag!"
                        })
                    })
                } else {
                    console.log("Could not find Birthday Channel in Guild " + guild.id)
                }
            })
        }
    }
}