const { v4: uuidv4 } = require('uuid');
  
const { validationResult} = require('express-validator')

const HttpError =require('../models/http-error');

let DUMMY_PLACES =[
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
  const placeId= req.params.pid; // {pid : p1}
  const place = DUMMY_PLACES.find( p => {
      return p.pid === placeId;
  });

  if(! place){
 
       new  HttpError('Could not find places for the provided  Id !',404) 
      
}

   res.json({ place  }); // This sends back a respose with a Json data/format

};


const getPlacesByUserId =(req,res,next) => {
  const userId =req.params.uid;
  const places =DUMMY_PLACES.filter( p => {
      return p.creator === userId ;
  }) ;
  if(! places || places.length === 0){
      return next(
           new  HttpError('Could not find places for the provided  Id !',404) 
           ); 
   }

  res.json({ places });

};

  const createPlace = (req,res,next) =>{
      const errors = validationResult(req);
      if( !errors.isEmpty() ){
          console.log(errors);
          throw new HttpError('Invalid inputs passed , please check your data !',422);
      }

      // Extracting data from the incomming request
   const {title,description,coordinates,address,creator}=req.body; 
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
      DUMMY_PLACES[placeIndex] = updatedPlace; // Replaced old object at that index with new updated places 
      
      res.status(200).json({place : updatedPlace});


  };

  const deletePlace =(req, res, next) =>{
      const placeId = req.params.pid;

      DUMMY_PLACES = DUMMY_PLACES.filter( p => p.id !== placeId);
      res.status(200).json({message : "Your Data is deleted !"})

  };


exports.getPlaceById = getPlaceById;
// exports.getAllPlaces = getPlaces
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace ;

exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;



