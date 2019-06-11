// initMap callback function for maps script tag
function initMap() {
    // map options
    var options = {
        zoom: 11,
        center: {lat: 41.9696, lng: -71.3565}
    }
    // new map
    var map = new google.maps.Map(document.getElementById('map'), options);
    
    // add marker
    var marker = new google.maps.Marker({
        position: {lat: 41.9696, lng: -71.3565},
        map: map
    });
}













