"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _response = _interopRequireDefault(require("../server/class/util/response.class"));

require('dotenv').config();

var jwtDecode = token => {
  var rawToken = token.replace('Bearer ', '');

  try {
    return _jsonwebtoken.default.verify(rawToken, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

var FORBIDDEN_REQUEST = 'Forbidden Request';
var _default = {
  requiredJwt: (req, res, next) => {
    var authorization = req.get('Authorization');
    var response = new _response.default(res);

    if (!authorization) {
      response.contentFail(response.statusForbidden, FORBIDDEN_REQUEST);
      return;
    }

    var payload = jwtDecode(authorization);

    if (!payload) {
      response.contentFail(response.statusForbidden, FORBIDDEN_REQUEST);
      return;
    }

    req.admin = payload;
    next();
  },
  optionalJwt: (req, res, next) => {
    var authorization = req.get('Authorization');
    var response = new _response.default(res);
    req.admin = {};

    if (!authorization) {
      next();
      return;
    }

    var payload = jwtDecode(authorization);

    if (!payload) {
      response.contentFail(response.statusForbidden, FORBIDDEN_REQUEST);
      return;
    }

    req.admin = payload;
    next();
  }
};
exports.default = _default;
//# sourceMappingURL=jwt.middleware.js.map
