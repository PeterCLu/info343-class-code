/*
    script file for index.html
    dependencies: leaflet, jquery

    Open Street Maps tile layer URL template:
    http://{s}.tile.osm.org/{z}/{x}/{y}.png

    attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
*/
 $(function() {
     'use strict';

     function createMap(loc, zoom) {
         var map = L.map('map').setView(loc, zoom);

         L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
             attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
         }).addTo(map);

         //Can add STYLE CLASS and HTML content in the Popup
         L.circleMarker(loc).addTo(map).bindPopup('<h2>FUCK OFF</h2>').fadeIn();
     }

     //check to see if browser supports geolocation
     // have a fall back if they don't
     if(navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(pos) {
             createMap([pos.coords.latitude, pos.coords.longitude], 15)
         });

     } else {
         createMap([47.6097, -122.3331], 12);
     }

 });

//get jason
//wait for it to come back
//iterate over the array with .forEach or other iterator
//check lat and long of data obj
//create map
//create multiple markers
//pay attention to who owns camera and adjust style color accordingly