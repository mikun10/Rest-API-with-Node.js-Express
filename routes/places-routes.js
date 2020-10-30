const express =require('express');

const { check } = require('express-validator');

const placescontrollers = require('../controllers/places-controllers');

const router = express.Router();

router.get('/:pid', placescontrollers.getPlaceById);


router.get('/user/:uid', placescontrollers.getPlacesByUserId);


// adding multiple middleware functions 
router.post('/',[
    check('title').not().isEmpty(),
    check('description').isLength({ min:5 }),
    check('address').not().isEmpty()
], 
placescontrollers.createPlace);

router.patch('/:pid',[
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 })
],placescontrollers.updatePlace);

router.delete('/:pid',placescontrollers.deletePlace);

module.exports = router;
