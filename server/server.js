const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const server = express();
const loginModel = require("./models/signUp")
const PORT = process.env.PORT;
const URI = process.env.URI;
server.use(express.json());
server.use(cors());
server.use(express.urlencoded({extended: false}));
server.use(express.static('src'))

mongoose.connect(URI)
    .then(() => console.log("Mongodb sucessfully connected"))
    .catch((err) => console.log(err));
server.post("/form", (req,res)=>{
    console.log("helloooo");
    let loginData =  req.body;
    console.log(loginData);
    try{
        // const details = loginModel.create(loginData)
        console.log("tryyyyyy")
        const token = createToken(details)
        // res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge * 1000})
        return res.status(200).json({details});
    }catch(err){
        return res.status(303).json({err:"detils can't post to db"})
    }
});
server.post("/login",((req,res)=>{
    let  data = req.body;
    console.log(data);
    const {email, password} = data;
    
}))
server.listen(PORT,(()=>{
    console.log(`server is running at ${PORT}`);
}))

























































































