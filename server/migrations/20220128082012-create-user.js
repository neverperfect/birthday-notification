module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user', {
            user_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            first_name: {
                type: Sequelize.STRING,
            },
            last_name: {
                type: Sequelize.STRING,
            },
            timezone: {
                type: Sequelize.STRING,
            },
            birthdate: {
                type: Sequelize.STRING,
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('user');
    },
};
