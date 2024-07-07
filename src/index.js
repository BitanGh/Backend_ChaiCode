import express from "express";
import dotenv from "dotenv"

import app from "./app.js";
import connectDB from "./db/index.js";

connectDB()
.then(() =>{
  app.listen(process.env.PORT || 8000, () =>{
    console.log(`Server is lisening on ${process.env.PORT}`);
  });
  
})
.catch((error) =>{
  console.log(error);
})

dotenv.config({
  path: '.\.env'
})