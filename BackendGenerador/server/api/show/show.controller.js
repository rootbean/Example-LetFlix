/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/shows              ->  index
 * GET     /api/shows/:id          ->  show
 */

'use strict';

import request from 'request';

export function findAll(req, res) {
    return getRequest('https://api.tvmaze.com/shows', req, res);
}

export function findById(req, res) {
    let id = req.params.id;
    return getRequest(`https://api.tvmaze.com/shows/${id}`, req, res);
}

export function searchByShowName(req, res){
    let query = req.params.query
    getRequestSearchName('https://api.tvmaze.com/shows', query, req, res);
}

function getRequest(urlApi, req, res) {
  return request(urlApi, {
    json: true
  }, (err, reply, body) => {
    if (err) {
      return console.log(err);
    }
    res.status(200).json(body);
  });
}

function getRequestSearchName(urlApi, query ,req, res){
  return request(urlApi, {
    json: true
  }, (err, reply, body) => {
    if (err) {
      return console.log(err);
    }

    let show = [];

    for(let i = 0; i < 100; i++){
      if(body[i].name.toUpperCase().indexOf(query.toUpperCase()) !== -1){
        show.push(body[i]);
      }
    }
    res.status(200).json(show);
  });
}

function getUrlApi(data){
  return 'https://api.tvmaze.com/shows';
}