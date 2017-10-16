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

import jsonpatch from 'fast-json-patch';
import {FavoriteShow} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log('ERROR ', err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of FavoriteShows
export function index(req, res) {
  return FavoriteShow.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single FavoriteShow from the DB
export function show(req, res) {
  return FavoriteShow.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new FavoriteShow in the DB
export function addFavorite(req, res) {

  return FavoriteShow.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given FavoriteShow in the DB at the specified ID
export function removeFavorite(req, res) {

  return FavoriteShow.update({active: req.body.active},{
    where: {
      user: req.params.idUser,
      show: req.params.idShow
    }
  })
    .then(entity => {
      if(entity) return res.status(200).json(req.body.active);
    })
    .catch(handleError(res));
}

export function getShowsByUser(req, res ){
  return FavoriteShow.find({
    where: {
      user: req.params.idUser,
      show: req.params.idShow
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
