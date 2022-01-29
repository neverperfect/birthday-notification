"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2.default)(function* (queryInterface, Sequelize) {
      yield queryInterface.createTable('user', {
        user_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        first_name: {
          type: Sequelize.STRING
        },
        last_name: {
          type: Sequelize.STRING
        },
        timezone: {
          type: Sequelize.STRING
        },
        birthdate: {
          type: Sequelize.STRING
        },
        deleted_at: {
          allowNull: true,
          type: Sequelize.DATE
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    });

    function up(_x, _x2) {
      return _up.apply(this, arguments);
    }

    return up;
  }(),
  // eslint-disable-next-line no-unused-vars
  down: function () {
    var _down = (0, _asyncToGenerator2.default)(function* (queryInterface, Sequelize) {
      yield queryInterface.dropTable('user');
    });

    function down(_x3, _x4) {
      return _down.apply(this, arguments);
    }

    return down;
  }()
};
//# sourceMappingURL=20220128082012-create-user.js.map
