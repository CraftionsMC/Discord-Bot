/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

function getAuthor() {
    return {
        author: process.env.DISCORD_BOT_NAME,
        icon_url: process.env.DISCORD_BOT_AVATAR
    }
}

function getAuthorName() {
    return process.env.DISCORD_BOT_NAME;
}

function getAvatarUrl() {
    return process.env.DISCORD_BOT_AVATAR;
}

function check(string) {
    return string.toLowerCase().startsWith("true");
}

module.exports = {getAuthor, getAuthorName, getAvatarUrl, check}