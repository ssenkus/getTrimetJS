$(document).ready(function () {

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

    // can we query multiple locids??  then do this:
    var locIDs = ['2580'];
    /*	var startID = 6849;
	for (var i = 0; i < 2; i++)  {
		locIDs.push(startID++);
	}

	var locIDsString = locIDs.join(); */
    //end
    var trimetURL = 'http://developer.trimet.org/ws/V1/arrivals/locIDs/' + locIDs[0] + '/appID/5E48DCD7031297B7CBF2F37FD';

    $.ajax({
        type: "GET",
        url: trimetURL,
        dataType: 'xml',
        success: function (xml) {
            var lat = $(xml).find('location').attr('lat');
            var lng = $(xml).find('location').attr('lng');
            //					makeGmap(lat, lng);

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

                        var theDate = new Date(val / 1000);
                        var dateString = theDate.toGMTString();


                        $('#container ul:last').append('<p>Scheduled at:' + dateString + '</p>');
                    }
                });
            });

            makeGmap(lat, lng);
            $('.arrivals:even').parent().css('background-color', '#fff');
        }
    });


});