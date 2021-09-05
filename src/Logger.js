/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const chalk = require('chalk')
class Logger {

    static __console_log = console.log;

    static #lines = [];

    static __console_log_s = (msg) => {
        Logger.#lines.push(msg)
        Logger.__console_log(msg);
    }

    static log(msg, level) {
        switch (level) {
            case 1:
                this.warn(msg);
                break
            case 2:
                this.error(msg);
                break
            case 3:
                this.command(msg)
                break;
            default:
                this.info(msg)
        }
    }

    static info(msg) {
        this.__console_log_s(chalk.blue("[INFO]") + this.#getTimeStamp() + msg)
    }

    static error(msg) {
        this.__console_log_s(chalk.red("[ERROR]") + this.#getTimeStamp() + msg)
    }

    static warn(msg) {
        this.__console_log_s(chalk.yellow("[WARN]") + this.#getTimeStamp() + msg)
    }

    static command(msg) {
        this.__console_log_s(chalk.gray("[COMMAND]") + this.#getTimeStamp() + msg)
    }

    static save() {
        if(!fs.existsSync(path.join(__dirname, '..', 'private', 'logs'))) {
            fs.mkdirSync(path.join(__dirname, '..', 'private', 'logs'));
        }

        fs.writeFileSync(path.join(__dirname, '..', 'private', 'logs', 'log-' + Logger.#getTimeStamp_s() + ".log"), Logger.#lines.join("\n"))
    }

    static #getTimeStamp() {
        let d = new Date();
        return chalk.green(
            " "
            + d.getDay()
            + "/"
            + d.getMonth()
            + "/"
            + d.getFullYear()
            + " "
            + d.getHours()
            + ":"
            + d.getMinutes()
            + ":"
            + d.getSeconds()
            + " "
        )
    }

    static #getTimeStamp_s() {
        let d = new Date();
        return (
            d.getDay()
            + "."
            + d.getMonth()
            + "."
            + d.getFullYear()
            + "_"
            + d.getHours()
            + "-"
            + d.getMinutes()
            + "-"
            + d.getSeconds()
        )
    }
}
const fs = require("fs");

const path = require("path");

console.log = (m, l) => {
    Logger.log(m, l)
};

module.exports = {Logger};