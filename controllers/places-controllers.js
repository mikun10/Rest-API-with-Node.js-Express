const { v4: uuidv4 } = require('uuid');
const HttpError =require('../models/http-error');
 
 const DUMMY_PLACES =[
    {
         id:'p1',
        title:"Empire State Building",
        description:"One of the most famous sky scraper in the world !",
        location:{
            lat:40.7484425,
            lng:73.986758
        },
        address:'20 W 34th St, New York, NY 10001, United States',
        creator:'u1'
    }
];



const getPlaceById =(req,res,next)=>{
    const placeId = req.params.pid; // {pid : p1}
    const place = DUMMY_PLACES.find( p => {
        return p;
    });
 
    if(! place){
     throw new  HttpError('Could not find  a place for the provided  Id !',404);  
 
 }
 
     res.json({ place  }); // This sends back a respose with a Json data/format
 
 }


 const getPlaceByUserId =(req,res,next) => {
    const userId =req.params.uid;
    const place =DUMMY_PLACES.find( p => {
        return p.creator === userId ;
    }) ;

    if(! place){
       
        return next( 
            new HttpError('Could not find  a place for the provided  Id !',404)
            );
    }

    res.json({ place });

};

    const createPlace = (req,res,next) =>{
        const {title,description,coordinates,address,creator}=req.body; // Extracting data from the incomming request

        const createdPlace = {
            id:uuidv4(),
            title: title ,
            description: description ,
            location: coordinates,
            address: address,
            creator: creator
        };
        DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)

        res.status(201).json({place: createdPlace});

    };


    // midleware functions
    const updatePlace =(req, res, next) =>{
        const {title,description}=req.body;
        const placeId = req.params.pid;
        const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)};
        const placeIndex = DUMMY_PLACES.findIndex( p => p.id === placeId);
        updatedPlace.title = title;
        updatedPlace.description = description;
        DUMMY_PLACES[placeIndex] = updatedPlace; // Replaced old object at that index with new updated place 
        
        res.status(200).json({place : updatedPlace});


    };

    const deletePlace =(req, res, next) =>{};


exports.getPlaceById = getPlaceById;
// exports.getAllPlaces = getPlaces
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace ;

exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;



 