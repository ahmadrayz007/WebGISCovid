var mymap = L.map('mapdiv').setView([-7.2113, 107.9021], 10);
       
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
    
}).addTo(mymap);



    function getColor(p) {
        if(p === "Tidak_Sesuai") return "red";
        if(p === "Sangat_Sesuai") return "blue";
    return "grey";
    }

    function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.Kls_All)
		};
	}

    var geojson = L.geoJson(Cakung, {
		style: style,
	}).addTo(mymap);

    // for(var i = 0; i < garut.length; i++) {
    //     var obj = garut[i];
    
    //     console.log(obj.properties.Kls_All);
    // }

    // for(var key in garut.features.Kls_All){
    //     for(var key1 in garut.features.Kls_All[key]) {
    //         console.log(garut.features.Kls_All[key][key1])
    //     }
    // }
    var parse_georaster = require("georaster");

    var GeoRasterLayer = require("georaster-layer-for-leaflet");

    var url_to_geotiff_file = "./data/aksesbilitas.tif";

    fetch(url_to_geotiff_file)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
    parse_georaster(arrayBuffer).then(georaster => {
      console.log("georaster:", georaster);

      var layer = new GeoRasterLayer({
        georaster: georaster,
        opacity: 0.7,
        pixelValuesToColorFn: values => values[0] === 42 ? '#ffffff' : '#000000',
        resolution: 64 // optional parameter for adjusting display resolution
    });
    layer.addTo(mymap);

    map.fitBounds(layer.getBounds());

});
});
    // console.log(garut.properties)