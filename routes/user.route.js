const route = require('express').Router();
const auth_middleware = require('../middlewares/auth.middleware');

const User=require("../models/user.model");
const mongoose = require('mongoose')



route.get('/dashboard', auth_middleware.verifyToken, async(req, res) => {
    try {
        const user=await User.findById(req.user_id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }catch(e){
        res.status(500).send();
    }
});

route.patch('/dashboard', auth_middleware.verifyToken, async(req, res) => {
    try {
        console.log("before")
        const id=req.user_id;
        console.log("after")
        const {username,email,password,age }=req.body;
        console.log(req.body)
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id ${id}`);
        console.log("before")
        const updatedUser={username,email,password,age, _id:id};
        console.log("after")
        await User.findByIdAndUpdate(id,updatedUser,{new :true});
        res.json(updatedUser);
    } catch (e) {
        res.status(400).send(e)
    }
});

route.delete('/dashboard', auth_middleware.verifyToken, async(req, res) => {
    try{
        const  user=await User.findByIdAndRemove({ _id :req.user_id});
        if(!user){
            return res.status(404).send();
        }
        res.send(user)
    }catch(e){
        res.status(500).send();
    }
});

module.exports = route;