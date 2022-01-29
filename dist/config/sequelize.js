"use strict";

require('dotenv').config();

module.exports = {
  development: {
    database: process.env.UNIQUE_NAME_PG_DB,
    // birthday-notif
    host: process.env.UNIQUE_NAME_PG_HOST,
    // localhost
    username: process.env.UNIQUE_NAME_PG_USER,
    password: process.env.UNIQUE_NAME_PG_PASSWD,
    dialect: 'postgres'
  }
};
//# sourceMappingURL=sequelize.js.map
