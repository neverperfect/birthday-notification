"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _index = require("../../models/index");

class User {
  constructor(userId) {
    this.userId = userId;
  }

  getDetail() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      return _index.User.scope([{
        method: ['removeAttributes']
      }]).findOne({
        where: {
          user_id: _this.user_id
        }
      });
    })();
  }

  update(data) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var userData = yield _this2.getDetail();

      if (!userData) {
        return null;
      }

      var updatedRole = yield userData.update(data, {
        returning: true,
        decoded: data.decoded,
        previous: userData.dataValues,
        newValue: data
      });
      return updatedRole;
    })();
  }

  delete() {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      var userData = yield _this3.getDetail();

      if (!userData) {
        return null;
      }

      var deletedModel = yield userData.destroy();
      return deletedModel;
    })();
  }

}

var _default = User;
exports.default = _default;
//# sourceMappingURL=user.class.js.map
