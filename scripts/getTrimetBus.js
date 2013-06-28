$(document).ready(function () {
    getArrivals();
    var refreshArrivals = setInterval(function(){
            getArrivals()
        }, 3000); //60 * 1000);  // update every minute
    
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

  
    
    function getArrivals() {
		$('#container').empty();
        // can we query multiple locids??  then do this:
        var locIDs = ['2580'];
        var locIDsString = locIDs.join();
        //end
		
		// !!!!!!!!!!!!!!!!!! THIS IS THE FIRST CHANGE !!!!!!!!!!!!!!!!! EDIT THE REST LATER !!!!!!!!
		
        var trimetURL = 'http://developer.trimet.org/beta/v2/vehicles?routers=56&appID=5E48DCD7031297B7CBF2F37FD';

		
		
		
        $.ajax({
            type: "GET",
            url: trimetURL,
            dataType: 'xml',
            success: function (xml) {
                var lat = $(xml).find('location').attr('lat');
                var lng = $(xml).find('location').attr('lng');
                //					makeGmap(lat, lng);
                var queryTime = $(xml).find('resultSet').attr('queryTime');
                var timeNow = new Date(parseInt(queryTime));
                $('#timeUpdated').html(timeNow);
                $(xml).find('arrival').each(function () {
                    var tags = $(this).getAttributes();
                    var x = 0;
                    var lat = '';
                    var lng = '';
                    var uniqueIndex = '';
                    $.each(tags, function (index, val) {
                        if (x === 0) {
                            $('#container').append('<div class="span6"><ul class="arrivals"' + ' id="' + index + val + x + '"></ul></div>');
                        }
                        x++;

                        if (index === 'fullSign') {
                            $('#container ul:last').prepend('<h4>' + val + '</h4>');
                        }

                        if (index === 'scheduled') {

                            var dateString = new Date(parseInt(val * 1));
                            var dater = new Date(parseInt(val));
                            var hours = dater.getHours();
                            // minutes part from the timestamp
                            var minutes = dater.getMinutes();
                            // seconds part from the timestamp
                            var seconds = dater.getSeconds();

                            // will display time in 10:30:23 format
                            var formattedTime = hours + ':' + minutes + ':' + seconds;

                            $('#container ul:last').append('<p>Scheduled at: <strong>' + formattedTime + '</strong></p>');
                        }
                    });
                });
                makeGmap(lat, lng);

                $('.arrivals:even').parent().css('background-color', '#fff');
            }
        });

    }
    //makeGmap('45.5234', '-122.7972');

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