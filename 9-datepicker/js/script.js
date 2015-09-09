(function($){ 

	$(document).ready(function() {


		


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