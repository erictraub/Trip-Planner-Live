// var selectedHotel = document.getElementById('selectedHotel');
// var hotelBtn = document.getElementById('hotelBtn');
// var models = require('../models');
// var Place = models.Place;
var dayArray = [{
	hotel: [],
	restaurants: [],
	activities: []
}];

var counter = 2;
var activeDay = parseInt($('#activeDay').text());
// var index = activeDay - 1;


$('#hotelBtn').on('click', function() {


	var selectedHotel= $("#selectedHotel").val();
	$('#hotelList').append(
		'<div class="itinerary-item">' + 
		'<span class="title">' + selectedHotel + '</span>' +
		'<button class="btn btn-xs btn-danger remove btn-circle">x</button>' +
		'</div>'
	);

	var correctHotel;
	for (var i = 0; i < hotels.length; i++) {
		if (hotels[i].name === selectedHotel) {
			correctHotel = hotels[i];
		}
	};

	drawLocation(correctHotel.place.location, { 
		icon: '/images/lodging_0star.png',
		title: correctHotel.name
	});

	dayArray[activeDay - 1].hotel.push(correctHotel)


});




$('#restaurantBtn').on('click', function() {
	var selectedRestaurant= $("#selectedRestaurant").val();
	$('#restaurantList').append(
		'<div class="itinerary-item">' + 
		'<span class="title">' + selectedRestaurant + '</span>' +
		'<button class="btn btn-xs btn-danger remove btn-circle">x</button>' +
		'</div>');


	var correctRestaurant;
	for (var i = 0; i < restaurants.length; i++) {
		if (restaurants[i].name === selectedRestaurant) {
			correctRestaurant = restaurants[i];
		}
	};

	drawLocation(correctRestaurant.place.location, { 
		icon: '/images/restaurant.png',
		title: correctRestaurant.name
		});

	dayArray[activeDay - 1].restaurants.push(correctRestaurant)
});




$('#activitiesBtn').on('click', function() {

	var selectedActivity= $("#selectedActivity").val();
	$('#activitiesList').append(
		'<div class="itinerary-item">' + 
			'<span class="title">' + selectedActivity + '</span>' +
			'<button class="btn btn-xs btn-danger remove btn-circle">x</button>' +
		'</div>'
	);

	var correctActivity;
	for (var i = 0; i < activities.length; i++) {
		if (activities[i].name === selectedActivity) {
			correctActivity = activities[i];
		}
	};

	drawLocation(correctActivity.place.location, { 
		icon: '/images/star-3.png', 
		title: correctActivity.name
	});

	dayArray[activeDay - 1].activities.push(correctActivity);

});

$('.list-group').on('click', '.btn-danger', function() {
	// serah through array to find one with corret prop
	// console.log(dayArray[activeDay - 1]);
	// console.log($(this).parent().parent().attr('id'));

	for (var i = 0; i < markersArray.length; i++) {
		if (markersArray[i].title === $(this).prev().text()){
			removeLocation(markersArray[i])
		}
	};

	if($(this).parent().parent().attr('id') === 'hotelList'){
		for (var i = 0; i < dayArray[activeDay - 1].hotel.length; i++) {
			if(dayArray[activeDay - 1].hotel[i].name === $(this).prev().text()){
				dayArray[activeDay - 1].hotel.splice(i,1);
			}
		};
	} else if ($(this).parent().parent().attr('id') === 'restaurantList'){
		for (var i = 0; i < dayArray[activeDay - 1].restaurants.length; i++) {
			if(dayArray[activeDay - 1].restaurants[i].name === $(this).prev().text()){
				dayArray[activeDay - 1].restaurants.splice(i,1);
			}
		};
	} else if ($(this).parent().parent().attr('id') === 'activitiesList'){
		for (var i = 0; i < dayArray[activeDay - 1].activities.length; i++) {
			if(dayArray[activeDay - 1].activities[i].name === $(this).prev().text()){
				dayArray[activeDay - 1].activities.splice(i,1);
			}
		};
	}

	$(this).parent().remove();
	// removeLocation();
	// console.log(dayArray)
	
});



$('#plusBtn').on('click', function() {
	$('<button class="btn btn-circle day-btn" id="index">' + (dayArray.length + 1) + '</button>').insertBefore($(this));

	// $('#activeDay').text(counter);
	$('#activeDay').text(activeDay+1);
	activeDay++;

	// activeDay = counter;
	// console.log(activeDay)
	// counter++;

	dayArray.push({
		hotel: [],
		restaurants: [],
		activities: []
	});

	$('#restaurantList').empty();
	$('#hotelList').empty();
	$('#activitiesList').empty();

	// console.log(dayArray)

});





$('.day-buttons').on('click', '#index', function() {
	activeDay = parseInt($(this).text());

	// console.log(activeDay)
	$('#activeDay').text(activeDay);


	//remove all children of rest/jotel/act
	$('#restaurantList').empty();
	$('#hotelList').empty();
	$('#activitiesList').empty();






	// add correct data for selected day
	var obj = dayArray[activeDay - 1];


	for (var prop in obj) {

		if (prop === 'hotel') {

			for (var i = 0; i < obj.hotel.length; i++) {
				$('#hotelList').append(
					'<div class="itinerary-item">' + 
					'<span class="title">' + obj.hotel[i].name + '</span>' +
					'<button class="btn btn-xs btn-danger remove btn-circle">x</button>' +
					'</div>');
			};

		} 
		else if (prop === 'restaurants') {

			for (var i = 0; i < obj.restaurants.length; i++) {
				$('#restaurantList').append(
					'<div class="itinerary-item">' + 
					'<span class="title">' + obj.restaurants[i].name + '</span>' +
					'<button class="btn btn-xs btn-danger remove btn-circle">x</button>' +
					'</div>');
			};

		} 
		else if (prop === 'activities') {

			for (var i = 0; i < obj.activities.length; i++) {
				$('#activitiesList').append(
					'<div class="itinerary-item">' + 
					'<span class="title">' + obj.activities[i].name + '</span>' +
					'<button class="btn btn-xs btn-danger remove btn-circle">x</button>' +
					'</div>');
			};

		}

	}

});



$('#removeDay').on('click', function() {

	// clear markers for this day
	console.log(activeDay);
	console.log(markersArray);


	// START HERE, CHECK OUT THE CONSOLE LOG AND FIGURE OUT WHY ALL MARKERS ARENT BEING TAKEN OUT OF MARKERS ARRAY
	for (var i = 0; i < markersArray.length; i++) {
		if (markersArray[i].day === activeDay) {
			markersArray[i].setMap(null);
		}
	};

	for (var i = 0; i < markersArray.length; i++) {
		if (markersArray[i].day === activeDay) {
			markersArray.splice(i,1);
		}
	};

	console.log(markersArray);



	//Clean the DOM
	$('#restaurantList').empty();
	$('#hotelList').empty();
	$('#activitiesList').empty();

	//Creates an array of buttons, and removes the active days button
	var btns = $('.day-btn');
	if (btns.length > 1){
		btns[activeDay-1].remove();
		
	}

	//Subtracting the Numbers for each subsequent button (except for Day 1 edge case)
	var dayButtonArr = $('.day-buttons').children();
	for (var i = 0; i < dayButtonArr.length; i++) {
		if(parseInt(dayButtonArr[i].innerText) > activeDay){
			dayButtonArr[i].innerText = parseInt(dayButtonArr[i].innerText) - 1;
		}
	};
	if (parseInt($('#activeDay').text()) > 0){
		$('#activeDay').text(dayArray.length-1);
	}
	// if (parseInt($('#activeDay').text()) > 0){
	// 	counter--;
	// }

	//removes from array
	dayArray.splice(activeDay - 1, 1)

	//Updates activeDay
	activeDay = parseInt($('#activeDay').text());
	
	//Updating the Dom
	var obj = dayArray[activeDay - 1];
	for (var prop in obj) {

		if (prop === 'hotel') {

			for (var i = 0; i < obj.hotel.length; i++) {
				$('#hotelList').append(
					'<div class="itinerary-item">' + 
					'<span class="title">' + obj.hotel[i].name + '</span>' +
					'<button class="btn btn-xs btn-danger remove btn-circle">x</button>' +
					'</div>');
			};

		} 
		else if (prop === 'restaurants') {

			for (var i = 0; i < obj.restaurants.length; i++) {
				$('#restaurantList').append(
					'<div class="itinerary-item">' + 
					'<span class="title">' + obj.restaurants[i].name + '</span>' +
					'<button class="btn btn-xs btn-danger remove btn-circle">x</button>' +
					'</div>');
			};

		} 
		else if (prop === 'activities') {

			for (var i = 0; i < obj.activities.length; i++) {
				$('#activitiesList').append(
					'<div class="itinerary-item">' + 
					'<span class="title">' + obj.activities[i].name + '</span>' +
					'<button class="btn btn-xs btn-danger remove btn-circle">x</button>' +
					'</div>');
			};

		}

	}

});























