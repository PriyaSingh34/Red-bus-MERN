const express = require("express");
const mongoose = require("mongoose");
const app = express();

const url="mongodb+srv://priyasingh:Priya@cluster0.kepu1bm.mongodb.net/reserve?retryWrites=true&w=majority";
async function connect(){
    try{
        await mongoose.connect(url);
        console.log("connected to Database")
    }catch(error){
        console.log(error)
    }
}
connect();
app.listen(8000, ()=>{
    console.log("Server Started on port 8000")
})