/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

module.exports = async (member) => {
    require('./MemberStats').update(member.guild).then(r => delete require.cache[require.resolve('./MemberStats')]);
}