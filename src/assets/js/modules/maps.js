(function (win, doc, $) {

     window.getLocations = function () {
         initMap();
    };

    var waypts = [
        {
            location: 'Foster Dullesdreef 40 6716 CD Ede'
        },
        {
            location: 'Olthorst 8 6714 KS Ede'
        },
        {
            location: 'Jan van Schaffelaarstraat 25 3771 BR Barneveld'
        },
        {
            location: 'Nieuwe Erf 9 6741 AN Lunteren'
        },
        {
            location: 'Apeldoornseweg 60 6733 SC Wekerom'
        },
        {
            location: 'Vendelstraat 7 6711 AM Ede'
        },
        {
            location: 'Laarweg 27 6721 DA Bennekom'
        },
        {
            location: 'Lange Rijnsteeg 4 6721 NA Bennekom'
        },
        {
            location: 'Tarthorst 1211 6708 HZ Wageningen'
        },
        {
            location: 'Van Dompselaerstraat 23 3772 AC Barneveld'
        },
        {
            location: 'Achterdoelen 110 6711 AV Ede'
        },
        {
            location: 'Klomperweg 111 6741 PG Lunteren'
        },
        {
            location: 'Molenstraat 198 6712 CX Ede'
        },
        {
            location: 'Detmarlaan 47 6711 MP Ede'
        },
        {
            location: 'Hoogstraat 48 6701 BW Wageningen'
        },
        {
            location: 'Edeseweg 15 6733 AA Wekerom'
        },
        {
            location: 'Apeldoornseweg 60 6733 SC Wekerom'
        }
    ];



    var queue = 0;
    var map;
    var converted_waypoints;


    function initMap() {
        var googleMap = $.extend(google.maps, {});
        var options = {
            zoom: 5
        };

        map = new googleMap.Map($('#map')[0], options);

        converted_waypoints = convertAddress(waypts, map);

    }

    function createRoute(map) {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);
        directionsService.route({
                origin: "Ottostraat 9a 6716 BG Ede",
                destination: "Ottostraat 9a 6716 BG Ede",
                waypoints: converted_waypoints,
                optimizeWaypoints: true,
                travelMode: 'DRIVING'
            },
            function(response, status) {
                if (status == 'OK') {
                    directionsDisplay.setDirections(response);
                }
                else {
                    alert('Er is een fout opgetreden. Probeer de site te herladen.');
                }
            });
    }

    function convertAddress(waypoints) {
        if(typeof waypoints != 'object') {
            return;
        }

        var converted_address = [];
        var geocoder = new google.maps.Geocoder();

        for(var i = 0; i < waypoints.length; i++) {

            geocoder.geocode({
                'address': String(waypoints[i].location)
            }, function(results, status) {

                if (status == 'OK')  {
                    converted_address.push({
                        'location': new google.maps.LatLng(
                            results[0].geometry.location.lat(),
                            results[0].geometry.location.lng()
                        ),
                        'stopover': true
                    });

                    if(queue == (waypoints.length - 1)) {
                        converted_waypoints = converted_address;
                        createRoute(map);
                    }

                } else {
                    console.log(results);

                }

                queue++;
            });
        }
    }


}) (window.jQuery(window), window.jQuery(document), window.jQuery);