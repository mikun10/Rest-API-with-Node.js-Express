const express =require('express');

const placescontrollers = require('../controllers/places-controllers');

const router = express.Router();


router.get('/:pid',placescontrollers.getPlaceById);



router.get('/user/:uid',placescontrollers.getPlaceByUserId);


module.exports = router;
