"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _winston = _interopRequireDefault(require("winston"));

var _winstonTransportHttpStream = _interopRequireDefault(require("winston-transport-http-stream"));

var _context, _context2;

var logger = new _winston.default.createLogger({
  transports: [new _winston.default.transports.Console({
    json: true,
    colorize: true
  })]
});
var mongoLogger = new _winston.default.createLogger({
  level: 'info',
  transports: [new _winstonTransportHttpStream.default({
    url: (0, _concat.default)(_context = (0, _concat.default)(_context2 = "".concat(process.env.FLUENTD_URL, ":")).call(_context2, process.env.FLUENTD_PORT, "/")).call(_context, process.env.FLUENTD_DB),
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  })]
});
var _default = {
  logger,
  mongoLogger
};
exports.default = _default;
//# sourceMappingURL=winston.js.map
