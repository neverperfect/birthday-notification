"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config(); // define validation for all the env vars


var envVarsSchema = _joi.default.object({
  NODE_ENV: _joi.default.string().allow('development', 'production', 'test', 'provision').default('development'),
  PORT: _joi.default.number().default(4000),
  API_VERSION: _joi.default.string().default('1.0').description('API Version'),
  UNIQUE_NAME_PG_DB: _joi.default.string().default('api').description('Postgres database name'),
  UNIQUE_NAME_PG_TEST_DB: _joi.default.string().default('api-test').description('Postgres database for tests'),
  UNIQUE_NAME_PG_PORT: _joi.default.number().default(5432),
  UNIQUE_NAME_PG_HOST: _joi.default.string().default('localhost'),
  UNIQUE_NAME_PG_USER: _joi.default.string().required().default('postgres').description('Postgres username'),
  UNIQUE_NAME_PG_PASSWD: _joi.default.string().allow('').default('password').description('Postgres password'),
  UNIQUE_NAME_PG_SSL: _joi.default.bool().default(false).description('Enable SSL connection to PostgreSQL'),
  UNIQUE_NAME_PG_CERT_CA: _joi.default.string().description('SSL certificate CA') // Certificate itself, not a filename

}).unknown().required();

var {
  error,
  value: envVars
} = envVarsSchema.validate(process.env);

if (error) {
  throw new Error("Config validation error: ".concat(error.message));
} // if test, use test database


var isTestEnvironment = envVars.NODE_ENV === 'test';
var config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  apiVersion: envVars.API_VERSION,
  postgres: {
    db: isTestEnvironment ? envVars.UNIQUE_NAME_PG_TEST_DB : envVars.UNIQUE_NAME_PG_DB,
    port: envVars.UNIQUE_NAME_PG_PORT,
    host: envVars.UNIQUE_NAME_PG_HOST,
    user: envVars.UNIQUE_NAME_PG_USER,
    passwd: envVars.UNIQUE_NAME_PG_PASSWD,
    ssl: envVars.UNIQUE_NAME_PG_SSL,
    ssl_ca_cert: envVars.UNIQUE_NAME_PG_CERT_CA,
    dialect: 'postgres'
  }
};
var _default = config;
exports.default = _default;
//# sourceMappingURL=config.js.map
