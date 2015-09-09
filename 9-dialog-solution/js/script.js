(function($){ 

	$(document).ready(function() {

		// conditionally open the offerdialog from submit click
		$("#submit").on("click", function(event){
			event.preventDefault();
			if($("input[name='buy']").is(":checked")) {
				$("#offerdialog").dialog("open");
			}
		});

		// render offerdialog div as dialog box
		$("#offerdialog").dialog({
						autoOpen: false,
						width: 500,
						modal: true,
						// add buttons with click handlers
						buttons: [
									{
										text:"Send offers",
										click: function(event) {
											// display email address in offeremail span in main form
											// then close dialog
											var address = $("input[name='email']").val();
											$("#offeremail").text("We'll send offers to " + address);
											$(this).dialog("close");
										}
									}, 
									{
										text:"No thanks",
										click: function(event) {
											// clear offermail span in main form
											// then close dialog
											$("#offeremail").text("");
											$(this).dialog("close");
										}
									}
								]
						});

		// PREVIOUS EXERCISE

		// control display of offerwidgets form section
		$("#offerwidgets").hide();
		$("input[name='buy']").on("click", function(event){
			$("#offerwidgets").toggle();
		});

		// display radio buttons as button set
		$("#conditionbuttonset").buttonset();

		// display submit button as themed jQuery button
		$("#submit").button();

		// display offer value using two ranged values
		$("#offer").text("$10 - $150");
		$("#offerslider").slider({
									range: true,
									min: 1,
									max: 250,
									values: [10, 150],
									step: 1,
									// display low/high range values as text in offer span
									slide: function(event, ui) {
										$("#offer").text("$" + ui.values[0] + " - " + "$" + ui.values[1]);
									}
									});

		// display rating value using star graphics
		var defaultRating = 5;
		showStars($("#rating"), defaultRating);
		$("#ratingslider").slider({
									animate: "slow",
									value: defaultRating,
									min: 1,
									max: 7,
									step: 1,
									// display current value as stars in rating span
									slide: function(event, ui) {
										showStars($("#rating"), ui.value);
									}
									});

		// pre-built function to append specified stars to specified element
		function showStars($target, number) {
			$target.empty();
			var $star = $("<img/>").prop("src", "images/star.png");
			var $starholder = $("<span/>");
			for(var i=0; i<number; i++) {
				$starholder.append($star.clone());
			}
			$target.append($starholder);
		}

		// PREVIOUS EXERCISE

		$.datepicker.setDefaults($.datepicker.regional[""]);
		var languageCode = "es";
		// $("input[name*='date']").datepicker($.datepicker.regional[languageCode], {dateFormat:"mm-dd-yy"});

		$("input[name='reviewdate']").datepicker();

		$("input[name='startdate']").datepicker({
												defaultDate: "-1w",
												changeMonth: true,
												numberOfMonths: 2,
												onClose: function(selectedDate) {
													$("input[name='finishdate']").datepicker("option", "minDate", selectedDate);
												}
												});
		$("input[name='finishdate']").datepicker({
												changeMonth: true,
												numberOfMonths: 2,
												onClose: function(selectedDate) {
													$("input[name='startdate']").datepicker("option", "maxDate", selectedDate);
												}
												});

		// PREVIOUS EXERCISE

		// load books data as simple inline array
		// var books = ["Dracula", "Frankenstein", "Walden"];
		// $("#title").autocomplete({source:books});

		// declare books array for external data
		var books = [];

		$("#title").autocomplete({
								// assign books array as the autocomplete source
								source: books,
								// handle select events by displaying author data
								select: function(event, ui){
									$("#author").text(ui.item.author);
								}
								});

		// load external books data
		$.getJSON("data/no-copyright-books.json", function(data){
			$.each(data, function(index, item){
				// create objects for use by autocomplete field
				item.label = item.title;
				// item.value = item.author;
				// add configured item to books array
				books.push(item);
			});
			// console.log(books);
		});

	});

})(jQuery);