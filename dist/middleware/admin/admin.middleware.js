"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _adminHelper = _interopRequireDefault(require("../../server/class/admin/adminHelper.class"));

var _response = _interopRequireDefault(require("../../server/class/util/response.class"));

var _constant = _interopRequireDefault(require("./constant"));

var _default = {
  checkUsernameDuplicate: function () {
    var _checkUsernameDuplicate = (0, _asyncToGenerator2.default)(function* (req, res, next) {
      var {
        username
      } = req.body;
      var {
        adminId
      } = req.params;
      var response = new _response.default(res);

      if (username && (yield _adminHelper.default.isUsernameDuplicate(username, adminId))) {
        return response.contentFail(response.statusBadRequest, _constant.default.DUPLICATE_ADMIN_USERNAME);
      }

      return next();
    });

    function checkUsernameDuplicate(_x, _x2, _x3) {
      return _checkUsernameDuplicate.apply(this, arguments);
    }

    return checkUsernameDuplicate;
  }(),
  checkEmailDuplicate: function () {
    var _checkEmailDuplicate = (0, _asyncToGenerator2.default)(function* (req, res, next) {
      var {
        email
      } = req.body;
      var {
        adminId
      } = req.params;
      var response = new _response.default(res);

      if (email && (yield _adminHelper.default.isEmailDuplicate(email, adminId))) {
        return response.contentFail(response.statusBadRequest, _constant.default.DUPLICATE_ADMIN_EMAIL);
      }

      return next();
    });

    function checkEmailDuplicate(_x4, _x5, _x6) {
      return _checkEmailDuplicate.apply(this, arguments);
    }

    return checkEmailDuplicate;
  }()
};
exports.default = _default;
//# sourceMappingURL=admin.middleware.js.map
