const asyncHandler = require('express-async-handler')
const User = require('../models/Users')
const generateToken = require('../config/generateToken')

// to register a new user to database ( /api/user ) => post API
const registerUser = asyncHandler(async  (req, res) => {
    const {name, email, password, pic} = req.body

    //checking if all the feilds are filled
    if(!name || !email || !password){   
        if(!name && !email && !password){
            res.status(400)
            throw new Error("Please Enter the name and email and password")
        }else if(!email){
            res.status(400)
            throw new Error("Please Enter the email")
        }else if(!password){
            res.status(400)
            throw new Error("Please Enter Password")
        }
       
    }

    //checking the database for if user exist
    const userExist = await User.findOne({email})

    //if user exist in database throw a error
    if(userExist){
        res.status(400)
        throw new Error("User already exist")
    }

    //if not then
    //creating the user
    const user = await User.create({
        name, email, password, pic
    })

    //when user is created sucessfully, sending a response to frontend, along with the jwt token
    if(user){
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password:user.password,
        pic: user.pic,
        token:generateToken(user._id)
    })    
    }else {
        res.status(400)
        throw new Error("Failed to create the user")
    }
})

// to login the user ( /api/user/login ) => post API
const authUser = asyncHandler(async(req, res)=>{

    //taking the email and password from the frontend
    const {email , password} = req.body

    //finding the user by email provided from frontend
    const user = await User.findOne({email})

    //comparing the provided password and password in database with the user email if it matches correctly then 
    // logining the user
    if(user && (await user.matchPassword(password))){
        console.log("user found")
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password:user.password,
            pic: user.pic,
            token:generateToken(user._id)
        })
    }else{ // if password or email does not mathces then throwing the error
        throw new Error("Provided password and email does not exist")
    }
})

// to search all the user that are registered ( /api/user ) => get API 
// using the query method instead of body to send the data 
// It will work like this /api/user?search=name
// here search is the variable and name is the name we have to search
const allUsers = asyncHandler(async(req, res)=>{
    
    //getting the searched name
    const name = req.query.search
    
    // looping through the name and email avialable in the database
    const keyword = name ? {
        $or : [
            {name:{$regex: name, $options:'i'}},
            {email:{$regex: name, $options:'i'}}
        ]
    } : {}

    // getting all the users available in the database
    const user = await User.find(keyword).find({_id: {$ne: req.user._id}})

    res.status(201).send(user)
})

module.exports = {registerUser, authUser, allUsers}