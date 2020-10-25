const express =require('express');

const placescontrollers = require('../controllers/places-controllers');

const router = express.Router();


router.get('/:pid', placescontrollers.getPlaceById);
// router.get('/', placescontrollers.getPlaceById);

router.get('/user/:uid', placescontrollers.getPlaceByUserId);

router.post('/', placescontrollers.createPlace);

router.patch('/:pid',placescontrollers.updatePlace);
router.delete('/:pid',placescontrollers.deletePlace);

module.exports = router;
