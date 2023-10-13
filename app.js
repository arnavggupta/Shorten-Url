const express=require("express");
const app=express();
require("./db/conn");
const hbs=require("hbs");
const apth=require("path");
const port=process.env.PORT||8000;
const path=require("path");
// const generateshorturl=require("./controllers/url");
// const urlroutes=require("./routers/routes");
// app.use("url",urlroutes);
app.use(express.urlencoded({extended:false}));
app.use(express.json());
const user=require("./models/url");
app.set("view engine","hbs");
const  shortid = require("shortid");
app.get("/",(req,res)=>{
  res.render("index");
})
const staticpath=path.join(__dirname,"/styles");
app.use(express.static(staticpath));

app.post("/link-form",async(req,res)=>{

  if(!req.body.links){
    return res.status(400).json("please enter url");
}


console.log(req.body.links);
const shortId= shortid();
const urlentry= new  user({
shortyid:shortId,
redirecturl:req.body.links,
    visithistory:[]

})
try {
    await urlentry.save();
  //  return  res.json({ id: shortId });
  res.render("index1", { shortId: shortId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }



});





app.get("/:shortyy", async (req, res) => {
    const shortyy = req.params.shortyy;
  
    try {
      const result = await user.findOne({ shortyid: shortyy }); // Add a query condition
      if (result) {
        res.redirect(result.redirecturl);
      } else {
        res.status(404).send("Short URL not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
  


app.listen(port,()=>{
    console.log(`Server is started at port ${port}`);
})

