const router = require('express').Router()
const MovieController = require('../controllers/movieController');

router.get('/:id' , MovieController.getOne)

router.delete('/:id' , MovieController.delete)

router.put('/:id' , MovieController.update)

router.post('/' , MovieController.create)

router.get('/' , MovieController.getAll)




module.exports = router