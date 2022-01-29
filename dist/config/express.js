"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _cors = _interopRequireDefault(require("cors"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _helmet = _interopRequireDefault(require("helmet"));

var _i18next = _interopRequireDefault(require("i18next"));

var _i18nextExpressMiddleware = _interopRequireDefault(require("i18next-express-middleware"));

var _i18nextNodeFsBackend = _interopRequireDefault(require("i18next-node-fs-backend"));

var _index = _interopRequireDefault(require("../server/routes/index.route"));

var _config = _interopRequireDefault(require("./config"));

require('dotenv').config();

var app = (0, _express.default)(); // parse body params and attache them to req.body

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _cookieParser.default)());
app.use((0, _compression.default)());
app.use((0, _methodOverride.default)()); // secure apps by setting various HTTP headers

app.use((0, _helmet.default)());

_i18next.default.use(_i18nextNodeFsBackend.default).use(_i18nextExpressMiddleware.default.LanguageDetector).init({
  backend: {
    loadPath: "".concat(__dirname, "/../server/locales/{{lng}}/{{ns}}.json"),
    addPath: "".concat(__dirname, "/../server/locales/{{lng}}/{{ns}}.missing.json")
  },
  fallbackLng: 'id',
  preload: ['en', 'id'],
  saveMissing: true,
  interpolation: {
    format: (value, _format) => {
      if (_format === 'uppercase') return value.charAt(0).toUpperCase() + (0, _slice.default)(value).call(value, 1);
      return value;
    }
  }
});

app.use(_i18nextExpressMiddleware.default.handle(_i18next.default)); // enable CORS - Cross Origin Resource Sharing

app.use((0, _cors.default)()); // Get API Version from .env (or else assume 1.0)

var baseUrl = "/api/v".concat(_config.default.apiVersion); // mount all routes on /api path

app.use("".concat(baseUrl), _index.default); // error handler

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  return next(err);
}); // catch 404 and forward to error handler

app.use((req, res, next) => next(res.status(404).json({
  response: 404,
  result: {
    message: 'API Not Found'
  }
}))); // error handler, send stacktrace only during development

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : _httpStatus.default[err.status],
    stack: _config.default.env === 'development' ? err.stack : {}
  });
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=express.js.map
