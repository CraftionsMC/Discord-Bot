/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const path = require("path");

const MAX_LEVEL = 101;
const MIN_LEVEL = 0;

const EXTRA_XP_PER_LEVEL = 10;

let config = {};
if (fs.existsSync(path.join(__dirname, '..', 'private', 'levels.json'))) {
    config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'private', 'levels.json')).toString());
} else {
    console.log('The Level configuration was not found. Creating blank...', 1)
    if (!fs.existsSync(path.join(__dirname, '..', 'private'))) {
        fs.mkdirSync(path.join(__dirname, '..', 'private'))
    }
    fs.writeFileSync(path.join(__dirname, '..', 'private', 'levels.json'), JSON.stringify({}))
}

function getLevel(id) {
    let level = MAX_LEVEL;
    if (config[id]) {
        level = config[id].level;
    }
    return level;
}

function setLevel(id, level) {
    if (!config[id]) {
        config[id] = {level: MAX_LEVEL, xp: getLevelXP(MAX_LEVEL)}
    }
    config[id].level = level
    config[id].xp = getLevelXP(config[id].level)
    save();
}

function nextLevel(id) {
    let level = getLevel(id);
    if (level > MIN_LEVEL) {
        level--;
    }
    setLevel(id, level)
}

function getXP(id) {
    let xp = 0;
    if (config[id]) {
        xp = config[id].xp;
    }
    return xp;
}

function setXP(id, xp) {
    if (!config[id]) {
        config[id] = {level: MAX_LEVEL, xp: getLevelXP(MAX_LEVEL)}
    }
    config[id].xp = xp
    save();
}

function nextXP(id) {
    let xp = getXP(id);

    if (xp - 1 > 0) {
        xp--;
        setXP(id, xp)
    } else {
        nextLevel(id);
    }
}

function save() {
    fs.writeFileSync(path.join(__dirname, '..', 'private', 'levels.json'), JSON.stringify(config))
}

function reload() {
    config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'private', 'levels.json')).toString());
}

function getLevelXP(level) {
    return (
        (MAX_LEVEL - level) *
        ((MAX_LEVEL % level) + 3) +
        EXTRA_XP_PER_LEVEL // bias
    )
}

module.exports = {getLevel, setLevel, nextLevel, getXP, setXP, nextXP, save, reload, getLevelXP}