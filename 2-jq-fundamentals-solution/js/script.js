// Control jQuery $ reference and overall scope
(function($){

	// Run script after document is loaded and ready
	$(document).ready(function () {

		// Test ready event
		// alert('Hello jQuery');

		// Handle click events for showProducts button
		$("#showProducts").click(function(event) {

			// Test .click event.
			// alert("Button clicked");

			// Disable button
			$(this).prop("disabled", "true");

			// Test addItem() function
			// addItem("Buttons", "2.95", "buttons.jpg");

			// Call getProducts() to load and display data
			getProducts();

		});

		// Build item element and add to items container
		function addItem(product, price, image) {

			// Create and configure label and image elements
			var $label = $("<p>").text(product + ": $" + price);
			var $image = $("<img>").prop({
				src: "images/" + image,
				width: 200
			});

			// Create item element from image and label
			var $item = $("<div>").append($image).append($label);

			// Add CSS class and click handler to item
			$item.addClass("item");
			$item.on("click", function() {
				$(this).toggleClass("highlight");
			});

			// Add item element to items container
			$("#items").append($item);
		}

		// Load and display external data
		function getProducts() {

			// Request products data and pass result to inline handler
			$.getJSON('data/products.json', function(data) {

				// Pass each item in products collection to addItem()
				$.each(data, function(i, item) {
					addItem(item.product, item.price, item.image);
				});
			});
		}

	});

})(jQuery);


