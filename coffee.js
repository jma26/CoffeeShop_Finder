function initMap() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentPosition, defaultPosition)
    } else {
        alert('Geolocation is not supported on your browser');
    }



    function currentPosition(position) {
        console.log(`Your current position is latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`);

        //  Map options
        let mapOptions = {
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 11
        }

        // Current coordinates
        let location = {
            'lat': position.coords.latitude,
            'long': position.coords.longitude
        }

        // nearbySearch request fields
        let request = {
            location: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            type: ['cafe'],
            openNow: true,
            radius: 7000
        }
        // Infowindow initialization
        let infowindow = new google.maps.InfoWindow();

        // Map initialization
        let map = new google.maps.Map(document.getElementById('map'), mapOptions);

        let service = new google.maps.places.PlacesService(map);

        function callback(results, status) {
            // Clear the table before appending new list when viewport changes
            $("#table_place").children().remove();
            $('#table_place').append("<tr><th> Name </th><th> Rating </th></tr>");
            console.log('Function callback is hit');

            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                    // Update table with place's information
                    $('#table_place').append("<tr><td>" + results[i].name + "</td><td>" + results[i].rating + "</td></tr>");
                }
            }
        }

        let markers = [];
        // Create a marker for each result from function callback(results, status)
        // Note: calling callback will re-update placeInfo
        function createMarker(place) {
            let marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });
            markers.push(marker);

            // Add event map listener for marker 'click'
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name + "<br> Rating:" + place.rating);
                infowindow.open(map, this);
            });
        }

        // Bias results towards current maps' viewport
        // NOTE: Known bug when using 'bounds_changed' where event gets triggered multiple times
        google.maps.event.addListener(map, 'idle', function() {
            
            // Clear out old markers
            markers.forEach(function(marker) {
                marker.setMap(null);
            });
            markers = [];
            
            let lat = map.getBounds().getCenter().lat();
            let long = map.getBounds().getCenter().lng();
            let updatedBounds = new google.maps.LatLng(lat, long);

            let request = {
                location: updatedBounds,
                type: ['cafe'],
                openNow: true,
                radius: 7000
            }

            service.nearbySearch(request, callback);

        })
    }

    function defaultPosition() {
        let count = 0;
        console.log('Default position executed');

        // Initialize empty markers array
        let markers = [];

        // mapOptions
        let mapOptions = {
            center: {lat: 37.422000, lng: -122.084057},
            zoom: 10
        }

        // Map initialization
        let map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // nearbySearch request fields
        let request = {
            location: {lat: mapOptions.center.lat, lng: mapOptions.center.lng},
            type: ['cafe'],
            openNow: true,
            radius: 7000
        }
        
        // infoWindow initialization
        let infoWindow = new google.maps.InfoWindow;
        
        // nearbySearch initialization
        let service = new google.maps.places.PlacesService(map);

        function callback(results, status) {
            console.log('Function callback is hit');
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
        }

        // Create a marker for each result from function callback(results, status)
        function createMarker(place) {
            let marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });
            markers.push(marker);

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name + "<br> Rating:" + place.rating);
                infowindow.open(map, this);
            });
        }

        // Bias results towards current maps' viewport
        // NOTE: Known bug when using 'bounds_changed' where event gets triggered multiple times
        google.maps.event.addListener(map, 'idle', function() {
            // Clear out old markers
            markers.forEach(function(marker) {
                marker.setMap(null);
            });
            markers = [];
            
            let lat = map.getBounds().getCenter().lat();
            let long = map.getBounds().getCenter().lng();
            let updatedBounds = new google.maps.LatLng(lat, long);

            let request = {
                location: updatedBounds,
                type: ['cafe'],
                openNow: true,
                radius: 7000
            }

            service.nearbySearch(request, callback);

        })
    }
}
