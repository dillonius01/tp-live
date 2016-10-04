
// Renders all hotels/restos/activities as options in dropdown bar
$(document).on('ready', function() {
	var hotelChoices = $('#hotel-choices')
	var hotels = window.hotels;
	hotels.forEach(function(hotel) {
		hotelChoices.append('<option>' + hotel.name + '</option>');
	})

	var restaurantChoices = $('#restaurant-choices');
	var restaurants = window.restaurants;
	restaurants.forEach(function(restaurant) {
		restaurantChoices.append('<option>' + restaurant.name + '</option>');
	})

	var activityChoices = $('#activity-choices');
	var activities = window.activities;
	activities.forEach(function(activity) {
		activityChoices.append('<option>' + activity.name + '</option>');
	})
})

// Hotel, Resto, Activity buttons add to itinerary
$(document).on('ready', function() {

	$('#hotel-btn').on('click', function() {
		var selectedHotel = $('#hotel-choices option:selected').val();
		
		var hotelSlot = $('#hotel-slot');
		hotelSlot.html(
			'<span class="title">' + selectedHotel + 
			'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>');		
	})

	$('#restaurant-btn').on('click', function() {
		var selectedRestaurant = $('#restaurant-choices option:selected').val();
		var restaurantSlot = $('#restaurant-slot');
		
		if (restaurantSlot.html().indexOf(selectedRestaurant) === -1) {
			restaurantSlot.append(
				'<span class="title">' + selectedRestaurant + 
				'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>');

		}
	})

	$('#activity-btn').on('click', function() {
		var selectedActivity = $('#activity-choices option:selected').val();
		var activitySlot = $('#activity-slot');

		if (activitySlot.html().indexOf(selectedActivity) === -1) {
				activitySlot.append(
					'<span class="title">' + selectedActivity + 
					'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>');
		}
	})

})


