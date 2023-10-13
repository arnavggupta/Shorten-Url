const mongoose=require("mongoose");

const url=  "mongodb://127.0.0.1/shorten-url";

mongoose.connect(url).then( ()=> console.log("connection sucessful.."))
.catch((err)=>console.log(err));