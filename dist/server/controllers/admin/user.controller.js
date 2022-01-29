"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _userHelper = _interopRequireDefault(require("../../class/admin/userHelper.class"));

var _response = _interopRequireDefault(require("../../class/util/response.class"));

var _constant = _interopRequireDefault(require("./constant"));

var _user = _interopRequireDefault(require("../../class/admin/user.class"));

var _bdayNotif = _interopRequireDefault(require("../app/bdayNotif.controller"));

var _default = {
  create: function () {
    var _create = (0, _asyncToGenerator2.default)(function* (req, res) {
      req.body.decoded = req.user;
      var userData = yield _userHelper.default.create(req.body);
      var response = new _response.default(res);
      yield _bdayNotif.default.taskStop();
      yield _bdayNotif.default.birthdayScheduler();
      return response.contentSuccess(response.statusCreated, userData);
    });

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  getDetail: function () {
    var _getDetail = (0, _asyncToGenerator2.default)(function* (req, res) {
      var {
        userId
      } = req.params;
      var user = new _user.default(userId);
      var response = new _response.default(res);
      var requestedUser = yield user.getDetail();
      return requestedUser ? response.contentSuccess(response.statusOk, requestedUser) : response.contentFail(response.statusNotFound, _constant.default.ADMIN_ID_404_ERROR);
    });

    function getDetail(_x3, _x4) {
      return _getDetail.apply(this, arguments);
    }

    return getDetail;
  }(),
  getList: function () {
    var _getList = (0, _asyncToGenerator2.default)(function* (req, res) {
      var {
        page,
        row,
        order_by: orderBy,
        order_type: orderType,
        pagination = 'true',
        search
      } = req.query;
      var userData = pagination === 'true' ? yield _userHelper.default.getListPagination(page, row, orderBy, orderType, search) : yield _userHelper.default.getListAll(orderBy, orderType, search);
      var response = new _response.default(res);
      return response.contentSuccess(response.statusOk, userData);
    });

    function getList(_x5, _x6) {
      return _getList.apply(this, arguments);
    }

    return getList;
  }(),
  update: function () {
    var _update = (0, _asyncToGenerator2.default)(function* (req, res) {
      var {
        userId
      } = req.params;
      var user = new _user.default(userId);
      var response = new _response.default(res);
      var updatedUser = yield user.update(req.body);
      yield _bdayNotif.default.taskStop();
      yield _bdayNotif.default.birthdayScheduler();
      return updatedUser ? response.contentSuccess(response.statusOk, updatedUser) : response.contentFail(response.statusNotFound, _constant.default.ADMIN_ID_404_ERROR);
    });

    function update(_x7, _x8) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  delete: function () {
    var _delete2 = (0, _asyncToGenerator2.default)(function* (req, res) {
      var {
        userId
      } = req.params;
      var user = new _user.default(userId);
      var response = new _response.default(res);
      var deletedUser = yield user.delete(req.user);

      if (!deletedUser) {
        return response.contentFail(response.statusNotFound, _constant.default.ADMIN_ID_404_ERROR);
      }

      return response.contentSuccess(response.statusOk, deletedUser);
    });

    function _delete(_x9, _x10) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }()
};
exports.default = _default;
//# sourceMappingURL=user.controller.js.map
