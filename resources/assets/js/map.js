if ($('#enterAlamat').length) {

    var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };

    function initAutocomplete() {
        var autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('autocomplete')),
            {types: ['geocode']}
        );
        autocomplete.addListener('place_changed', fillInAddress);


            var geolocation = {
                lat: -6.227688623331213,
                lng: 106.83252453804016
            };

            var valueLat = $("#latitude").val();
            var valueLong = $("#longitude").val();

            if (valueLat != '') {
                geolocation = {
                    lat: parseFloat(valueLat),
                    lng: parseFloat(valueLong)
                };                    
            }

            var radius = 10000;


            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {

                    if (valueLat != '') {
                        geolocation = {
                            lat: parseFloat(valueLat),
                            lng: parseFloat(valueLong)
                        };                    
                    }else{
                        geolocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                    }
                    radius = position.coords.accuracy;
                    
                });

            }
            console.log(geolocation);
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: radius
            });

            autocomplete.setBounds(circle.getBounds());

            var geocoder = new google.maps.Geocoder();
            document.getElementById('enterAlamat').addEventListener('click', function() {
                geocodeAddress(geocoder, map);
            });

            var marker;

            function taruhMarker(map, latLng) {
                if (marker) {
                    // pindahkan marker
                    marker.setPosition(latLng);
                } else {
                    // buat marker baru
                    marker = new google.maps.Marker({
                        position: latLng,
                        map: map
                    });
                }
            }

            var map = new google.maps.Map(document.getElementById('lokasiMap'), {
                zoom: 18,
                center: geolocation,
            });

            google.maps.event.addListener(map, 'click', function (event) {
                taruhMarker(this, event.latLng);
                $("#longitude").val(event.latLng.lat());
                $("#latitude").val(event.latLng.lng());
                $("#labelLongitude").addClass('focused');
                $("#labelLatitude").addClass('focused');
            });
    }
           //menampilkan pencarian otomatis
    function fillInAddress() {
        var place = autocomplete.getPlace();
        for (var component in componentForm) {
            document.getElementById(component).value = '';
            document.getElementById(component).disabled = false;
        }
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
            }
        }
    }

          //menentukan latitude dan longitude
    function geocodeAddress(geocoder, resultsMap) {
        var lokasi = $("input[name=lokasi]").val();
        geocoder.geocode({'address': lokasi}, function(results, status) {
            if (status === 'OK') {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });
                   
            } else {
                Swal.fire({
                    title: 'Geocode was not successful for the following reason: ' + status,
                    type: 'error',
                    confirmButtonText: 'OK'
                })
            }
            $("#longitude").val(longitude);
            $("#labelLongitude").addClass('focused');
            $("#latitude").val(latitude);
            $("#labelLatitude").addClass('focused');
        });
    }
}
