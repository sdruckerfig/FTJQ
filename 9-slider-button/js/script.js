(function($){ 

	$(document).ready(function() {


		


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