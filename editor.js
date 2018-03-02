// The Google Map.
var map;

var geoJsonOutput;
var downloadLink;

function init() {
  // Initialise the map.zoom set to 14 and added menu slide button
  map = new google.maps.Map(document.getElementById('map-holder'), {
    center: {lat: 39.6249838, lng: 19.922346100000027},
    zoom: 14,  
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false, 
    mapTypeControl: true,    //enable map option control
    mapTypeControlOptions: {
       style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,   //add dropdown menu for the map style
       position: google.maps.ControlPosition.TOP_LEFT,       //menu on top center of the map
       mapTypeIds: ['satellite','roadmap']
  });
	  
	
  map.data.setControls(['Point', 'LineString', 'Polygon']);
  map.data.setStyle({
    editable: true,
    draggable: true,
    clickable: true
  });

	// DINATOTITA DIAGRAFIS TOU MONOPATIOU 3 erotima
/*https://developers.google.com/maps/documentation/javascript/examples/delete-vertex-menu 
https://gist.github.com/zross/9893056*/
  bindDataLayerListeners(map.data);

  // Retrieve HTML elements.
  var mapContainer = document.getElementById('map-holder');
  geoJsonOutput = document.getElementById('geojson-output');
  downloadLink = document.getElementById('download-link');
}

google.maps.event.addDomListener(window, 'load', init);

// Refresh different components from other components.
function refreshGeoJsonFromData() {
  map.data.toGeoJson(function(geoJson) {
    geoJsonOutput.value = JSON.stringify(geoJson);
    refreshDownloadLinkFromGeoJson();
  });
}

// Refresh download link.
function refreshDownloadLinkFromGeoJson() {
  downloadLink.href = "data:;base64," + btoa(geoJsonOutput.value);
}

// Apply listeners to refresh the GeoJson display on a given data layer.
function bindDataLayerListeners(dataLayer) {
  dataLayer.addListener('addfeature', refreshGeoJsonFromData);
  dataLayer.addListener('removefeature', refreshGeoJsonFromData);
  dataLayer.addListener('setgeometry', refreshGeoJsonFromData);
}
