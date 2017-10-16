/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/shows              ->  index
 * GET     /api/shows/:id          ->  show
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAll = findAll;
exports.findById = findById;
exports.searchByShowName = searchByShowName;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findAll(req, res) {
  return getRequest('https://api.tvmaze.com/shows', req, res);
}

function findById(req, res) {
  var id = req.params.id;
  return getRequest('https://api.tvmaze.com/shows/' + id, req, res);
}

function searchByShowName(req, res) {
  var query = req.params.query;
  getRequestSearchName('https://api.tvmaze.com/shows', query, req, res);
}

function getRequest(urlApi, req, res) {
  return (0, _request2.default)(urlApi, {
    json: true
  }, function (err, reply, body) {
    if (err) {
      return console.log(err);
    }
    res.status(200).json(body);
  });
}

function getRequestSearchName(urlApi, query, req, res) {
  return (0, _request2.default)(urlApi, {
    json: true
  }, function (err, reply, body) {
    if (err) {
      return console.log(err);
    }

    var show = [];

    for (var i = 0; i < 100; i++) {
      if (body[i].name.toUpperCase().indexOf(query.toUpperCase()) !== -1) {
        show.push(body[i]);
      }
    }
    res.status(200).json(show);
  });
}

function getUrlApi(data) {
  return 'https://api.tvmaze.com/shows';
}
//# sourceMappingURL=show.controller.js.map
