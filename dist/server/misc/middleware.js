"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _startsWith = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/starts-with"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var jwt = require('jsonwebtoken');

var {
  validationResult
} = require('express-validator');

var {
  setContent,
  getContentFail
} = require('../response/response');

var config = require('../../config/config').default;

var checkToken = (req, res, next) => {
  var token = req.headers['x-access-token'] || req.headers.authorization;

  if (token && (0, _startsWith.default)(token).call(token, 'Bearer ')) {
    // Remove Bearer from string
    token = (0, _slice.default)(token).call(token, 7, token.length);
  }

  if (!token) {
    var error = {
      message: 'Authorization needed'
    };
    setContent(401, error);
    return res.status(401).json(getContentFail(error));
  }

  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      var _error = {
        message: 'Unauthorized request'
      };
      setContent(401, _error);
      return res.status(401).json(getContentFail(_error));
    }

    req.decoded = decoded;
    return next();
  });
};

var checkUserType = (req, res, next, types) => {
  if (!(0, _includes.default)(types).call(types, req.decoded.role_id)) {
    var error = {
      message: 'Unauthorized Request'
    };
    setContent(401, error);
    return res.status(401).json(getContentFail(error));
  }

  return next();
};

var checkValidation = (req, res, next) => {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    var _context;

    var errorMessage = [];
    (0, _forEach.default)(_context = errors.errors).call(_context, error => {
      errorMessage.push(error.msg);
    });
    setContent(422, {
      message: errorMessage
    });
    return res.status(422).json(getContentFail("(Validation) ".concat(errorMessage)));
  }

  return next();
};

module.exports = {
  checkToken,
  checkUserType,
  checkValidation
};
//# sourceMappingURL=middleware.js.map
