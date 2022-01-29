"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _roleHelper = _interopRequireDefault(require("../../server/class/admin/roleHelper.class"));

var _response = _interopRequireDefault(require("../../server/class/util/response.class"));

var _constant = _interopRequireDefault(require("./constant"));

var _default = {
  checkNameDuplicate: function () {
    var _checkNameDuplicate = (0, _asyncToGenerator2.default)(function* (req, res, next) {
      var {
        name
      } = req.body;
      var {
        roleId
      } = req.params;
      var response = new _response.default(res);

      if (name && (yield _roleHelper.default.isNameDuplicate(name, roleId))) {
        return response.contentFail(response.statusBadRequest, _constant.default.DUPLICATE_ROLE_NAME);
      }

      return next();
    });

    function checkNameDuplicate(_x, _x2, _x3) {
      return _checkNameDuplicate.apply(this, arguments);
    }

    return checkNameDuplicate;
  }()
};
exports.default = _default;
//# sourceMappingURL=role.middleware.js.map
