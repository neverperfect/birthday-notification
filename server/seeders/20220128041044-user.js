require('babel-polyfill');

const fs = require('fs');

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
        const newData = [];
        const rawdata = fs.readFileSync('server/masterdata/user.json');
        const data = JSON.parse(rawdata);
        await Promise.all(data.map(async (x) => {
            const seedData = {
                first_name: x.first_name,
                last_name: x.last_name,
                timezone: x.timezone,
                birthdate: x.birthdate,
                created_at: new Date(),
                updated_at: new Date(),
            };
            // eslint-disable-next-line max-len
            // if (newData.findIndex((x) => x.name === seedData.name) === -1) newData.push(seedData);
            newData.push(seedData);
        }));

        return queryInterface.bulkInsert('user', newData);
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    },
};
