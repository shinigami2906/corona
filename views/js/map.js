
function updateWorld() {
    $.ajax({
        method :"GET",
        url:"http://localhost:3000/world",
    }).then(req =>{
        vn = $(".world");
        vn[0].textContent = req.cases;
        vn[1].textContent = req.deaths;
    })
}

function updatemapVN() {
    $.ajax({
        method :"GET",
        url:"http://localhost:3000/vn",
    }).then(req =>{
        let tr = $("tbody tr")[0];
        i= 0;
        req.provinces.forEach(element => {
                if (element.cases == "0" || element.cases == undefined) element.fill = "#ededf5"
                else {
                    element.fill = "#5564c2";
                    let clone = tr.cloneNode(true);
                    i++;
                    clone.children[0].textContent = i;
                    clone.children[1].textContent = element.name;
                    clone.children[2].textContent = element.cases;
                    clone.children[3].textContent = element.deaths;
                    clone.style.display = "";
                    tr.parentNode.appendChild(clone)
                }
        });
        vn = $(".vn");
        vn[0].textContent = req.cases;
        vn[1].textContent = req.deaths;
        var chart = am4core.create("chartdiv", am4maps.MapChart);
        chart.geodata = am4geodata_vietnamHigh;
        chart.projection = new am4maps.projections.Miller();
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        let polygonTemplate =  polygonSeries.mapPolygons.template;
        polygonSeries.useGeodata = true;
        polygonSeries.data = req.provinces;
        polygonTemplate.propertyFields.fill = "fill";
        polygonTemplate.tooltipText = "{name}: {cases} : {deaths}";
    })
    
}

updatemapVN();
updateWorld();