var express=require("express");
var app=express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res)
{
res.render("kaustubh.ejs");
});
app.listen(5000,function(){
    console.log("Server has started");
})