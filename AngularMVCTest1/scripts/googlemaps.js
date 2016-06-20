var mapOptions = {
    zoom: 5,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
}
var delay = 100;
var infowindow = new google.maps.InfoWindow();
var latlng = new google.maps.LatLng(101.0000, 58.0000);
var geocoder = new google.maps.Geocoder();
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
var bounds = new google.maps.LatLngBounds();
var locations = []; //массив адресов
var markers = []; //массив маркеров
var nextAddress = 0;

//очищаем маркеры
function removeMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function geocodeAddress(address, next) {
    geocoder.geocode({ address: address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var p = results[0].geometry.location;
            var lat = p.lat();
            var lng = p.lng();
            createMarker(address, lat, lng);
        }
        else {
            if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                nextAddress--;
                delay++;
            } else {
            }
        }
        next();
    }
    );
}
function createMarker(add, lat, lng) {
    var contentString = add;
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
    });
    markers.push(marker);

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    });

    bounds.extend(marker.position);
}

function theNext() {
    if (nextAddress < locations.length) {
        setTimeout('geocodeAddress("' + locations[nextAddress] + '",theNext)', delay);
        nextAddress++;
    } else {
        map.fitBounds(bounds);
    }
}
theNext();

$("#show_address").click(function () {
    removeMarkers();
    markers = [];
    locations = [];
    results = [];
    nextAddress = 0;

    $('#admin_table .address').each(function () {
        locations.push($(this).html());
    });

    theNext();
});