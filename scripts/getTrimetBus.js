$(document).ready(function () {
    getBusPos();


    var refreshBusPosition = setInterval(function(){
            getBusPos()
        }, 60 * 1000);  // update every minute
    
    // just a quick and easy helper jQuery function 
    (function ($) {
        $.fn.getAttributes = function () {
            var attributes = {};

            if (this.length) {
                $.each(this[0].attributes, function (index, attr) {
                    attributes[attr.name] = attr.value;
                });
            }
            

            return attributes;
        };
    })(jQuery);

  
    
    function getBusPos() {
		$('#container').empty();
        // can we query multiple locids??  then do this:
        var locIDs = ['2580'];
        var locIDsString = locIDs.join();
        //end
		
		// !!!!!!!!!!!!!!!!!! THIS IS THE FIRST CHANGE !!!!!!!!!!!!!!!!! EDIT THE REST LATER !!!!!!!!
		
        var trimetURL = 'http://developer.trimet.org/beta/v2/vehicles?ids=2215&appID=5E48DCD7031297B7CBF2F37FD';
	
		
        $.ajax({
            type: "GET",
            url: trimetURL,
            dataType: 'json',
            success: function (json) {
				console.log(json);
                var lat = json.resultSet.vehicle[0].latitude;
				var lng = json.resultSet.vehicle[0].longitude;
                //var lng = $(json).find('resln').attr('lng');
				console.log(lat + ", "+ lng);
				makeGmap(lat, lng);
            }
        });

    }

    function makeGmap(lat, lng) {
        // -- Map --
        // -- -- build Map --
        var coords = new google.maps.LatLng(lat, lng);
        var mapOptions = {
            zoom: 15,
            center: coords,
            mapTypeControl: true,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.SMALL
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        var marker = new google.maps.Marker({
            position: coords,
            title: "Trimet Stop!"
        });
        marker.setMap(map);

    }

});