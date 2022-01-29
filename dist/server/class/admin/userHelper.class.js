"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _index = require("../../models/index");

var _misc = _interopRequireDefault(require("../../misc/misc"));

var sequelize = require('sequelize');

class UserHelper {
  static create(data) {
    return (0, _asyncToGenerator2.default)(function* () {
      return _index.user.create({
        first_name: data.first_name,
        last_name: data.last_name,
        birthdate: data.birthdate,
        timezone: data.timezone
      }, {
        returning: true,
        decoded: data.decoded
      });
    })();
  }

  static getListPagination() {
    var _arguments = arguments;
    return (0, _asyncToGenerator2.default)(function* () {
      var page = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : 1;
      var row = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : 10;
      var orderBy = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : 'user_id';
      var orderType = _arguments.length > 3 && _arguments[3] !== undefined ? _arguments[3] : 'ASC';
      var param = _arguments.length > 4 ? _arguments[4] : undefined;

      var pagination = _misc.default.simplePagination(page, row);

      var option = {
        limit: pagination.row,
        offset: pagination.page,
        order: [[orderBy, orderType]],
        where: {}
      };
      return _index.user.scope([{
        method: ['removeAttributes']
      }]).findAndCountAll(option);
    })();
  }

  static getListAll() {
    var _arguments2 = arguments;
    return (0, _asyncToGenerator2.default)(function* () {
      var orderBy = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : 'user_id';
      var orderType = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : 'ASC';
      var param = _arguments2.length > 2 ? _arguments2[2] : undefined;
      var option = {
        order: [[orderBy, orderType]],
        where: {}
      };
      return _index.user.scope([{
        method: ['removeAttributes']
      }]).findAndCountAll(option);
    })();
  }

}

var _default = UserHelper;
exports.default = _default;
//# sourceMappingURL=userHelper.class.js.map
