const { v4: uuidv4 } = require('uuid');

const { validationResult} = require('express-validator');

// Adding  our own error class
const HttpError = require('../models/http-error'); 

// Adding middleware functions
const DUMMY_USRES = [
    {
    id:"u1",
    name:"Max Millon",
    email:"maxmillon@gmail.com",
    password:"testmax"
}
];

const getUsers = (req,res,next) => {
    res.json({users: DUMMY_USRES})
};

const signup = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalid Email ID or Password , Please check again ',422)
    }

    const {name,email,password} = req.body; // extracting data from the  incomming request body

    const hasUser = DUMMY_USRES.find(u => u.email === email);
    if(hasUser){
        throw new HttpError('Could not create email, provided email id  already exist !',422)
    }

    const createdUser = {
        id:uuidv4(),
        name, //name:name 
        email,
        password
    };
            DUMMY_USRES.push(createdUser);
            res.status(201).json({user:createdUser});
};

const login = (req,res,next) => {
    const {email,password} =req.body;
    const identifiedUser = DUMMY_USRES.find( u => u.email !== email);

    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Could not identify user, credential seem to  be wrong ', 401)

    }
    res.json({message: 'You have successfully loged in .'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login ;




