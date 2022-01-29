"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _index = require("../../models/index");

var _request = _interopRequireDefault(require("../../misc/request"));

/* eslint-disable no-unused-vars */

/* eslint-disable no-template-curly-in-string */
var cron = require('node-cron');

var task = null;

class BdayNotifController {
  static birthdayScheduler() {
    return (0, _asyncToGenerator2.default)(function* () {
      // Get all user data
      var userData = yield _index.user.findAll({
        raw: true
      });
      (0, _forEach.default)(userData).call(userData, user => {
        var _context, _context2;

        var birthdate = new Date(user.birthdate);
        var day = birthdate.getDate();
        var month = birthdate.getMonth() + 1;
        var bdayMessage = (0, _concat.default)(_context = "Happy Birthday ".concat(user.first_name, " ")).call(_context, user.last_name, "!"); // Schedule all tasks - sends notification at 9 AM on user's birthday

        task = cron.schedule((0, _concat.default)(_context2 = "* 9 ".concat(day, " ")).call(_context2, month, " *"), () => {
          var _context3;

          console.log((0, _concat.default)(_context3 = "It's ".concat(user.first_name, " ")).call(_context3, user.last_name, "'s birthday, sending request..")); // Send request

          _request.default.hookbinRequest('/', {
            method: 'POST',
            qs: {
              message: bdayMessage
            },
            json: true,
            resolveWithFullResponse: true
          });
        }, {
          scheduled: true,
          timezone: user.timezone
        });
      });
    })();
  }

  static taskStart() {
    return (0, _asyncToGenerator2.default)(function* () {
      // Function to start cron scheduler
      try {
        task.start();
      } catch (e) {
        console.log(e);
      }

      return console.log('Task started');
    })();
  }

  static taskStop() {
    return (0, _asyncToGenerator2.default)(function* () {
      // Function to stop cron scheduler
      try {
        task.stop();
      } catch (e) {
        console.log(e);
      }

      return console.log('Task stopped');
    })();
  }

}

var _default = BdayNotifController;
exports.default = _default;
//# sourceMappingURL=bdayNotif.controller.js.map
