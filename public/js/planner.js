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
			'<listpair><span class="title">' + hotelText +
			'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></listpair>');

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
				'<listpair><span class="title">' + restaurantText +
				'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></listpair>');
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
					'<listpair><span class="title">' + activityText +
					'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></listpair>');
		}

		drawMarker(map, 'activity', activityObject.place.location, activityText)
	})

})

// Remove from itinerary functions
$(document).on('ready', function() {

	$('.itinerary-item').on('click', '.btn', function() {

		var spanToRemove = $(this).parent().children('span');
		var buttonToRemove = $(this);
		var listpairToRemove = $(this).parent();
		var itineraryText = spanToRemove.text();
		var markerType = buttonToRemove.parent().parent().attr('id').slice(0, -5);

		// 1. remove text & button from page
		listpairToRemove.remove();
	
		// 2. remove marker from map
		markers[markerType][itineraryText].setMap(null);

		// 3. remove marker from tracker object (?)
		delete markers[markerType][itineraryText];

	})
})

// Create new Day button when + clicked
$(document).on('ready', function() {
	$('#day-add').on('click', function() {
		var newButtonVal = Number($(this).prev().text()) + 1;
		var newDay = '<button class="btn btn-circle day-btn">' + newButtonVal.toString() + '</button>';
		$(newDay).insertBefore($(this));
	})
})

