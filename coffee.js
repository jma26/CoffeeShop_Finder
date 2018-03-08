function initMap() {

    if (navigator.geolocation) {
        // getCurrentPosition accepts 2 parameters(successful coords, error)
        navigator.geolocation.getCurrentPosition(currentPosition, defaultPosition);
    } else {
        console.log("Geolocation is not supported by this browser");
    }



    function currentPosition(position) {
        console.log(`Your current position is latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`);

        //  Map options
        let mapOptions = {
            center: {lat: position.coords.latitude, lng: position.coords.longitude},
            zoom: 11
        }

        // Current coordinates
        let location = {
            'lat': position.coords.latitude,
            'long': position.coords.longitude
        }

        // Bounds for nearBySearch
        let currentBounds = new google.maps.LatLng(location.lat, location.long);
        // nearbySearch request fields
        let request = {
            location: currentBounds,
            type: ['cafe'],
            openNow: true,
            radius: 7000
        }
        // Infowindow initialization
        let infowindow = new google.maps.InfoWindow();

        // Map initialization
        let map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // Bias results towards current maps' viewport
        map.addListener('bounds_changed', function() {
            
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
        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

        function callback(results, status) {
            console.log('Function callback is hit');
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
        }

        let markers = [];
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
    }

    function defaultPosition() {
        console.log('Default position executed');
        let mapOptions = {
            center: {lat: 37.4219999, lng: -122.08405749999997},
            zoom: 11
        }

        // Map initialization 
        let map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // Infowindow initialization
        let infowindow = new google.maps.InfoWindow();

        // Bounds for nearBySearch
        let currentBounds = new google.maps.LatLng(mapOptions.center.lat, mapOptions.center.lng);

        // nearbySearch request fields
        let request = {
            location: currentBounds,
            type: ['cafe'],
            openNow: true,
            radius: 7000
        }

        // Bias results towards current maps' viewport
        map.addListener('bounds_changed', function() {

            // Clear out old markers (Another way not using built-in method .forEach)
            for (let i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            // markers.forEach(function(marker) {
            //     marker.setMap(null);
            // });
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

        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

        function callback(results, status) {
            console.log('Function callback is hit');
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
        }

        let markers = [];
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
    }
}
