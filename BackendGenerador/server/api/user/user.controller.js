'use strict';

import sha512 from 'sha512';
import {User} from '../../sqldb';
import {FavoriteShow} from '../../sqldb';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.findAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

/**
 * Creates a new user
 */
export function create(req, res) {

  let data = req.body;
  data.password = sha512(req.body.password).toString('hex');
  return User.create(data)
    .then(user => {
      return res.status(201).json('Created user!');
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.find({
    where: { id: userId },
    include: [
      { model: FavoriteShow, as: 'favoritesShows'}
    ]
  })
    .then(user => {
      if(!user) return res.status(404).end();
  
      res.json(user);
    })
    .catch(err => next(err));
}