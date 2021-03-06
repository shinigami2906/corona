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
        script = parserScript(script);
        fs.readFile("vn.txt", (err,data)=>{
            data = JSON.parse(data);
            data.provinces.forEach(x =>{
                script.forEach(y=>{
                    if (x.newID == y.ma) {
                        x.deaths = y.tuVong;
                        x.cases = y.soCaNhiem;
                    } 
                    if (y.ma == "VNALL") {
                        data.deaths = y.tuVong;
                        data.cases = y. soCaNhiem;
                    }
                })
            })
            
            fs.writeFile("vn.txt", JSON.stringify(data),(err)=>{

            })
        })

    })
}

crawlerData();
