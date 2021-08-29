const router = require('express').Router();
const routesMovie = require('./routesMovie');
const routesTv = require('./routesTV');
const EachCollection = require('../controllers/readAlldataController');

router.get('/entertainme' , EachCollection.getAll)

router.use('/movie', routesMovie);

router.use('/tv-series', routesTv);




module.exports = router;