const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const auth = require('../middleware/auth')
require('dotenv').config();

//user registration route 
router.post('/signup', async (req, res) => {
    const {username, password, name} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username, password: hashedPassword, name})
        await newUser.save();
        res.status(200).json(newUser)
        }catch(error){
            res.status(500).json({error: error.message})
        }
});

//user login route

router.post('/login', async(req, res) => {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username});
        if(user && await bcrypt.compare(password, user.password)){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
            res.json({token});
        }else{
            res.status(400).json({error: 'Invalid Credentials'})
        }
        }catch(error){
            res.status(500).json({error: error.message})
        }
});

// profile route

router.get(':/id', auth, async (req, res) => {
    try{
        const user = await user.findById(req.params.id);
            res.json(user);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

module.exports = router

