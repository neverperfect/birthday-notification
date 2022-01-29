"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _http = _interopRequireDefault(require("http"));

var _config = _interopRequireDefault(require("./config/config"));

var _express = _interopRequireDefault(require("./config/express"));

var _bdayNotif = _interopRequireDefault(require("./server/controllers/app/bdayNotif.controller"));

var server = _http.default.Server(_express.default);

require('dotenv').config(); // module.parent check is required to support mocha watch


if (!module.parent) {
  // listen on port config.port
  server.listen(_config.default.port, () => {
    var _context;

    _bdayNotif.default.birthdayScheduler();

    console.info((0, _concat.default)(_context = "server started on port ".concat(_config.default.port, " (")).call(_context, _config.default.env, ")")); // eslint-disable-line no-console
  });
}

var _default = _express.default;
exports.default = _default;
//# sourceMappingURL=index.js.map
