/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/comments              ->  index
 * POST    /api/comments              ->  create
 * GET     /api/comments/:id          ->  show
 * PUT     /api/comments/:id          ->  upsert
 * PATCH   /api/comments/:id          ->  patch
 * DELETE  /api/comments/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deleteProperty = require('babel-runtime/core-js/reflect/delete-property');

var _deleteProperty2 = _interopRequireDefault(_deleteProperty);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.findByIdShow = findByIdShow;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

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
    console.log('ERR ', err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Comments
function findByIdShow(req, res) {
  return _sqldb.Comment.findAll({
    where: {
      show: req.params.idShow
    },
    include: [{ model: _sqldb.User }]
  }).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Comment from the DB
function show(req, res) {
  return _sqldb.Comment.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Comment in the DB
function create(req, res) {
  var data = req.body;
  data.registerDate = new Date();

  return _sqldb.Comment.create(data).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given Comment in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    (0, _deleteProperty2.default)(req.body, '_id');
  }

  return _sqldb.Comment.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  }).then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Comment in the DB
function patch(req, res) {
  if (req.body._id) {
    (0, _deleteProperty2.default)(req.body, '_id');
  }
  return _sqldb.Comment.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Comment from the DB
function destroy(req, res) {
  return _sqldb.Comment.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=comment.controller.js.map
