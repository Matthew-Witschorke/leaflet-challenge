var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"

d3.json(queryURL, function(data) {
    createFeatures(data.features);
});

var mag = []

function createFeatures(earthquakeData) {
    // Define a function we want to run once for each feature in the features array and add place/time to each object.
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
        mag.push(feature.properties.mag)}
    
    // Creating GeoJSON layer with an array of earthquakeData 
    // Doing onEach func. to each datapoint in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });
    
    // Pushing Earthquake layer to Func.
    createMap(earthquakes);
}
console.log(mag)

function createMap(earthquakes) {
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
    });

    var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
    };

    var overlayMaps = {
        Earthquakes: earthquakes
    };

    var myMap = L.map("map", {
        center: [
        37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}