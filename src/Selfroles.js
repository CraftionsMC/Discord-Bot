/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const path = require("path");

let config = {};
if (fs.existsSync(path.join(__dirname, '..', 'private', 'selfroles.json'))) {
    config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'private', 'selfroles.json')).toString());
} else {
    console.log('The Selfroles configuration was not found. Creating blank...', 1)
    if (!fs.existsSync(path.join(__dirname, '..', 'private'))) {
        fs.mkdirSync(path.join(__dirname, '..', 'private'))
    }
    fs.writeFileSync(path.join(__dirname, '..', 'private', 'selfroles.json'), JSON.stringify({}))
}

function addSelfRole(id, guild, emoji) {
    if (!config[guild]) {
        config[guild] = {};
    }

    config[guild][id] = emoji;

    save();
}

function removeSelfRole(id, guild) {
    if (config[guild]) {
        delete config[guild][id];
        save();
    }
}

function getSelfRoles(guild) {
    let selfRoles = [];

    if (config[guild]) {
        Object.keys(config[guild]).forEach(id => {
            selfRoles.push({
                id: id,
                emoji: config[guild][id]
            })
        })
    }

    return selfRoles;
}

function getSelfRole(guild, emoji) {

    let role = '';

    if (config[guild]) {
        Object.keys(config[guild]).forEach(id => {
            if(config[guild][id] === emoji) {
                role = id;
            }
        })
    }

    return role;

}

function hasSelfRole(guild, emoji) {
    return !(getSelfRole(guild, emoji) === '')
}

function save() {
    fs.writeFileSync(path.join(__dirname, '..', 'private', 'selfroles.json'), JSON.stringify(config))
}

function reload() {
    config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'private', 'selfroles.json')).toString());
}


module.exports = {addSelfRole, removeSelfRole, getSelfRoles, getSelfRole, hasSelfRole, save, reload}