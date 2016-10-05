var map = initializeMap();

// key is name of location, value is marker
var markers = {
	hotel: {},
	restaurant: {},
	activity: {}
}
// Renders all hotels/restos/activities as options in dropdown bar
$(document).on('ready', function() {
	var hotelChoices = $('#hotel-choices')
	hotels.forEach(function(hotel) {
		hotelChoices.append('<option>' + hotel.name + '</option>');
	})

	var restaurantChoices = $('#restaurant-choices');
	restaurants.forEach(function(restaurant) {
		restaurantChoices.append('<option>' + restaurant.name + '</option>');
	})

	var activityChoices = $('#activity-choices');
	activities.forEach(function(activity) {
		activityChoices.append('<option>' + activity.name + '</option>');
	})
})

// Hotel, Resto, Activity buttons add to itinerary
$(document).on('ready', function() {

	$('#hotel-btn').on('click', function() {
		var hotelText = $('#hotel-choices option:selected').val();
		var hotelObject = (hotels.find(function(hotel){
			return hotel.name === hotelText;
		}))

		var hotelSlot = $('#hotel-slot');
		hotelSlot.html(
			'<span class="title">' + hotelText +
			'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>');

		// clears previous hotel marker, and empties markers.hotel object
		var hotelKeys = Object.keys(markers.hotel);
		if (hotelKeys.length){
			markers.hotel[hotelKeys[0]].setMap(null)
			markers.hotel = {};
		}
		// places a marker at that location
		drawMarker(map, 'hotel', hotelObject.place.location, hotelText)
	})

	$('#restaurant-btn').on('click', function() {
		var restaurantText = $('#restaurant-choices option:selected').val();
		var restaurantObject = (restaurants.find(function(restaurant){
			return restaurant.name === restaurantText;
		}))

		var restaurantSlot = $('#restaurant-slot');
		if (restaurantSlot.html().indexOf(restaurantText) === -1) {
			restaurantSlot.append(
				'<span class="title">' + restaurantText +
				'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>');
		}

		drawMarker(map, 'restaurant', restaurantObject.place.location, restaurantText)
	})

	$('#activity-btn').on('click', function() {
		var activityText = $('#activity-choices option:selected').val();
		var activityObject = (activities.find(function(activity){
			return activity.name === activityText;
		}))

		var activitySlot = $('#activity-slot');
		if (activitySlot.html().indexOf(activityText) === -1) {
				activitySlot.append(
					'<span class="title">' + activityText +
					'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>');
		}

		drawMarker(map, 'activity', activityObject.place.location, activityText)
	})

})

// Remove from itinerary functions
