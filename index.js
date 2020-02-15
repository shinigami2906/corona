const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));

app.get("/",(req,res)=>{
    res.send(__dirname+"/views/index.html")
})

app.listen(3000)

app.post("/xx",(req,res)=>{
    let x = {}
    x.provinces = req.body;
    fs.writeFile("vn.txt", JSON.stringify(x), (err)=>{
        
    })
})