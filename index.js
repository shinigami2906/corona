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

app.get("/vn", (req,res)=>{

    fs.readFile("vn.txt",(err,data)=>{
        data = JSON.parse(data);
        res.json(data);
    })
})
app.get("/world", (req,res)=>{

    fs.readFile("world.txt",(err,data)=>{
        data = JSON.parse(data);
        res.json(data);
    })
})