const express = require("express");
const { json } = require("body-parser");
const cors = require('cors');
const app = express();
const registerRoute = require("./Routes/register");
const loginRoute = require("./Routes/login");
const mongoose = require('mongoose');


app.use(cors({
    origin: '*'
}));
app.use(json());
app.options('*', cors()) 
const port = process.env.PORT || 3000;


app.use('/', registerRoute);
app.use('/', loginRoute);
app.listen(port, (error)=>{
    if(error){
        console.log(`Error connecting to the port ${port}`);
    }
    else{
        const dbConnectionURL = `mongodb://localhost:27017/chaap-do`
        mongoose.connect(dbConnectionURL).then(function(){
            console.log("connected to mongo db server");
            console.log(`Connected to port ${port}`);
        }).catch(function(error){
            console.log("error connecting mongodb server",error);
        })
    }

})

