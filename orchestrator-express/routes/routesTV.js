const router = require('express').Router()
const TvController = require('../controllers/tvController');

router.get('/:id' , TvController.getOne)

router.delete('/:id' , TvController.delete)

router.put('/:id' , TvController.update)

router.post('/' , TvController.create)

router.get('/' , TvController.getAll)


module.exports = router