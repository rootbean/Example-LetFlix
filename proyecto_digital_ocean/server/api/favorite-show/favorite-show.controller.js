/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/favorites_shows              ->  index
 * POST    /api/favorites_shows              ->  create
 * GET     /api/favorites_shows/:id          ->  show
 * PUT     /api/favorites_shows/:id          ->  upsert
 * PATCH   /api/favorites_shows/:id          ->  patch
 * DELETE  /api/favorites_shows/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.show = show;
exports.addFavorite = addFavorite;
exports.removeFavorite = removeFavorite;
exports.getShowsByUser = getShowsByUser;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _sqldb = require('../../sqldb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
    } catch (err) {
      return _promise2.default.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.destroy().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log('ERROR ', err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of FavoriteShows
function index(req, res) {
  return _sqldb.FavoriteShow.findAll().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single FavoriteShow from the DB
function show(req, res) {
  return _sqldb.FavoriteShow.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new FavoriteShow in the DB
function addFavorite(req, res) {

  return _sqldb.FavoriteShow.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given FavoriteShow in the DB at the specified ID
function removeFavorite(req, res) {

  return _sqldb.FavoriteShow.update({ active: req.body.active }, {
    where: {
      user: req.params.idUser,
      show: req.params.idShow
    }
  }).then(function (entity) {
    if (entity) return res.status(200).json(req.body.active);
  }).catch(handleError(res));
}

function getShowsByUser(req, res) {
  return _sqldb.FavoriteShow.find({
    where: {
      user: req.params.idUser,
      show: req.params.idShow
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}
//# sourceMappingURL=favorite-show.controller.js.map
