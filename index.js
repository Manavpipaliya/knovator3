const express = require('express');

const app = express();

const mongoose = require("mongoose");
const morgan = require("morgan");  // used to see requests 

const  dotenv = require("dotenv");  // used to get the environment variables
dotenv.config();



// routes

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postroute = require("./routes/posts");



const port = process.env.PORT || 2222;


const Users = require("./models/users");
const Post = require("./models/Post");



// middleware

app.use(express.json());

app.use(morgan("common"));



 // routes


 app.use("/api/users", userRoute);
 app.use("/api/auth", authRoute);
 app.use("/api/posts",  postroute);


    
       
   

 

 mongoose.connect(process.env.MONGO_URL,
    {
useNewUrlParser:true, useUnifiedTopology : true},
 () => {
        console.log("connected to mongo");
    }
    
);
 

app.listen(port ,()=>{
    console.log(`server is running on port ${port}`);
})


