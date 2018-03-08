function initMap() {
    if (navigator.geolocation) {
        // getCurrentPosition accepts 2 parameters(successful coords, error)
        navigator.geolocation.getCurrentPosition(currentPosition, defaultPosition);
    } else {
        console.log("Geolocation is not supported by this browser");
    }

    function currentPosition(position) {
        console.log(`Your current position is latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`);
        let mapOptions = {
            center: {lat: position.coords.latitude, lng: position.coords.longitude},
            zoom: 11
        }
        let map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }

    function defaultPosition() {
        console.log('Default position executed');
        let mapOptions = {
            center: {lat: 37.4219999, lng: -122.08405749999997},
            zoom: 11
        }
        let map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }
}
