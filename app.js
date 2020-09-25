//Bassic Rouoting..
const express =require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes'); // importing places-routes.js //Now we can use it as a middleware


const app =express();

app.use('/api/places',placesRoutes);

app.listen(5000);


