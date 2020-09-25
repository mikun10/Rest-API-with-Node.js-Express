const express =require('express');

const router = express.Router();

const DUMMY_PLACES =[
    {
        id:'p1',
        title:"Empire State Building",
        description:"One of the most famous skuy scraper in the world !",
        location:{
            lat:40.7484425,
            lng:73.9867587,
        },
        address:'20 W 34th St, New York, NY 10001, United States',
        creator:'u1'
    }
]

router.get('/:pid',(req,res,next)=>{
   const placeId = req.params.pid; // {pid : p1}
   const place = DUMMY_PLACES.find( p => {
       return p.id === placeId;
   });
    res.json({ place  }); // This sends back a respose with a Json data/format

});

router.get('/user/:uid',(req,res,next) => {
    const userId =req.params.uid;
    const place =DUMMY_PLACES.find( p => {
        return p.creator === userId ;
    }) ;
    res.json({ place });

});


module.exports = router;