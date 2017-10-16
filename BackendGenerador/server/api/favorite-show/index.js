'use strict';

var express = require('express');
var controller = require('./favorite-show.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(),controller.addFavorite);
router.put('/:idUser/:idShow', auth.isAuthenticated(),controller.removeFavorite);

router.get('/all/:idUser/:idShow',auth.isAuthenticated() ,controller.getShowsByUser);

module.exports = router;
