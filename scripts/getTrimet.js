$(document).ready(function() {
	(function($) {
		$.fn.getAttributes = function() {
			var attributes = {}; 

			if( this.length ) {
				$.each( this[0].attributes, function( index, attr ) {
					attributes[ attr.name ] = attr.value;
				}); 
			}

			return attributes;
		};
	})(jQuery);

	// can we query multiple locids??  then do this:
	var locIDs = [2580];
	var startID = 3639;
	for (var i = 0; i < 2; i++)  {

		locIDs.push(startID);
			startID += 30;
	}

	var locIDsString = locIDs.join(); 
	alert(locIDsString);
	//end
	
	// start encr
	var appIDb64 = 'NUU0OERDRDcwMzEyOTdCN0NCRjJGMzdGRA=='
	var b64array = "ABCDEFGHIJKLMNOP" +
           "QRSTUVWXYZabcdef" +
           "ghijklmnopqrstuv" +
           "wxyz0123456789+/" +
           "=";
	var input = appIDb64;
	
    var output = "";
    var hex = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
        $("#message").html("There were invalid base64 characters in the input text.\n" +
              "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
              "Expect errors in decoding.");
    } else {
        $("#message").html("");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    do {
        enc1 = b64array.indexOf(input.charAt(i++));
        enc2 = b64array.indexOf(input.charAt(i++));
        enc3 = b64array.indexOf(input.charAt(i++));
        enc4 = b64array.indexOf(input.charAt(i++));
        
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        
        output = output + String.fromCharCode(chr1);
        
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
    
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    
    } while (i < input.length);
	// end ecr
    var appID = (unescape(output));
	
		$.ajax({
				type: "GET",
				url: 'http://developer.trimet.org/ws/V1/arrivals/locIDs/' + locIDsString + '/appID/' + appID,
				dataType: 'xml',
				success: function(xml) {
					
					var lat = $(xml).find('location').attr('lat');
					var lng = $(xml).find('location').attr('lng');
					makeGmap(lat, lng);

					$(xml).find('arrival').each(function(){                
						var tags = $(this).getAttributes();
						var x = 0;
						var lat = '';
						var lng = '';
						var uniqueIndex =  '';
						$.each(tags, function(index, val) {
							if (x === 0) {
								$('#container').append('<div class="span4"><ul class="arrivals"' + ' id="' + index + val + x + '"></ul></div>');
							}
							x++;
							$('#container ul:last').append('<li>' + index + ': ' + val + '</li>');
							
							if (index === 'locid') { 
								$('#container ul:last').prepend('<h2>Stop ID: ' + val + '</h2>'); 
							}
						});
					});

					
				}
			});
			

});