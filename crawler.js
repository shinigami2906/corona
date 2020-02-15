const axios = require("axios").default;
const jsdom = require("jsdom").JSDOM;
const fs = require("fs");

function parserScript(data) {
    let x = data.indexOf("'[{")
    let y = data.indexOf("}]'")
    data = data.substring(x+1,y+2);
    data = JSON.parse(data);
    return data;
}
function crawlerData() {
    axios.create({
        method:"GET",
        url :"https://www.worldometers.info/coronavirus/",
    })().then(response =>{
        let data = response.data;
        let dom = new jsdom(data);
        let span  = dom.window.document.querySelectorAll(".maincounter-number span");
        let arr = [];
        dom.window.document.querySelectorAll("#table3 tr").forEach((tr,key) =>{
            if (key != 0){
                arr.push({
                    name: tr.children[0].textContent,
                    cases : tr.children[1].textContent,
                    deaths : tr.children[3].textContent
                })
            }
            
        })
        console.log(arr)
        fs.writeFile("world.txt",JSON.stringify({
            deaths : span[1].textContent,
            cases :span[0].textContent,
            countries : arr
        }),(err)=>{
            if (err) console.log(err);
        })
    });
    axios.create({
        method:"GET",
        url:"https://ncov.moh.gov.vn/"
    })().then(response => {
        let data = response.data;
        let dom = new jsdom(data);
        let script = dom.window.document.querySelector(".portlet-body script").textContent;
        data = parserScript(script);
      
    })
}
crawlerData();