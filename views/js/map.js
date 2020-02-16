


function updatemapVN() {
    $.ajax({
        method :"GET",
        url:"http://localhost:3000/map",
    }).then(req =>{
        req.provinces.forEach(element => {
                if (element.cases == "0" || element.cases == undefined) element.fill = "#ededf5"
                else element.fill = "#5564c2";
        });
        let vn = $(".vn");
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