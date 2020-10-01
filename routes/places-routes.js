const express =require('express');

const placescontrollers = require('../controllers/places-controllers');

const router = express.Router();


router.get('/:pid',placescontrollers.getPlaceById);

router.get('/user/:uid',placescontrollers.getPlaceByUserId);
router.post('./',placescontrollers.createPlace);

module.exports = router;
