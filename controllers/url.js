const express=require("express");
const app=express();
const hbs=require("hbs");
const  shortid = require("shortid");
// const path=require("path");
app.set("view engine","hbs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
async function  generateshorturl(req,res){
    
const  user= require("../models/url");  
// require("../db/conn");  



if(!req.body.links){
    return res.status(400).json("please enter url");
}

const shortId= shortid();
const urlentry= new  user({
shortyid:shortId,
redirecturl:req.body.links,
    visithistory:[]

})
try {
    await urlentry.save();
   return  res.json({ id: shortId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }



}



module.exports=generateshorturl;
