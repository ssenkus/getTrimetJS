function makeGmap(lat, lng) {
// -- Map --
// -- -- build Map --
	var coords = new google.maps.LatLng(lat, lng);
	var mapOptions = {
		zoom: 16,
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
    title:"Trimet Stop!"
});
marker.setMap(map);

}










