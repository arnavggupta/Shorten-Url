const mongoose=require("mongoose");

const URLschema= new mongoose.Schema({

shortyid:{
    type:String,
    required:true,
    unique:true,
},
redirecturl:{
    type:String,
    required:true,
    
},
visithistory:[{timestamp:{type:Number}}],




},{timestamps:true});


const user=new mongoose.model("Arnavg",URLschema);

//  yeh arnavg tera colln ka name iski jagah kuch bhi rkhlo boss jo tum chaye yaar

module.exports=user;