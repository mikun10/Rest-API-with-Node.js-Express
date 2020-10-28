//Bassic Rouoting..
const express =require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
 // importing places-routes.js //Now we can use it as a middleware

const usersRoute =require('./routes/users-routes')

const HttpError = require('./models/http-error');


const app = express();
// To get data out of the body we need middleware.
app.use(bodyParser.json());

app.use('/api/places',placesRoutes);
app.use('/api/users',usersRoute)

// <-------Handling Errors for UnSupported Routes- ---->
app.use((req,res,next) => {
    const error = new HttpError("Could not find this rout ", 404);
    throw error;
})


// <------Error Handling Middle Ware---->
//Tis middleware function with 4 parameter is treated as a special fuction by express  , 
//That means this function will only be executed on request that has error attached to it.

app.use( (error,req,res,next) => {
    if(res.headerSent)
    {
        return next(error);
    }
    // If no respond has sent yet
    res.status(error.code || 500);
    res.json({message : error.message || 'An Unknown error has occured !'});

});

app.listen(5000);
 

