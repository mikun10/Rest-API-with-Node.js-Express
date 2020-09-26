//Bassic Rouoting..
const express =require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes'); // importing places-routes.js //Now we can use it as a middleware


const app =express();

app.use('/api/places',placesRoutes);


// <------Error Handlin Middle Ware---->
//Tis middleware function with 4 parameter is treated as a special fuction by express  , 
//That means this function will only be executed on request that has error attached to it.

app.use( (error,req,res,next) => {
    if(res.headerSent)
    {
        return next(error);
    }
    // If no respond has sent yet
    res.status(error.code || 500);
    res.json({messsage : error.messsage || 'An Unknown error has occured !'});

});

app.listen(5000);


