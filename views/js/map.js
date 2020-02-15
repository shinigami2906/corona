// Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);

chart.geodata = am4geodata_vietnamHigh;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());


polygonSeries.useGeodata = true;

