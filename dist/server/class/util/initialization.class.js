"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require('dotenv').config();

class Initialization {
  constructor(token) {
    this.token = token;
  }

  getJwtData() {
    return _jsonwebtoken.default.verify(this.jwt, process.env.JWT_TOKEN);
  }

}

var _default = Initialization;
exports.default = _default;
//# sourceMappingURL=initialization.class.js.map
