// Control jQuery $ reference and overall scope
(function($){

	// Run script after document is loaded and ready
	jQuery(document).ready(function () {

		$("#itemSelector").change(function() {

			var selectedItem = $(this).val();

			// EXERCISE 5 - Using Ajax parameters and callbacks





		});

		function loadSelectedItem(data) {
			$(".item").remove();
			loadItems(data);
		}
		function beforeSendHandler(xhr, options) {
			console.log("beforeSend: options and xhr");
			console.log(options);
			console.log(xhr);
		}
		function errorHandler(xhr, status) {
			console.log("error: status and xhr");
			console.log(status);
			console.log(xhr);
		}
		function completeHandler(xhr, status) {
			console.log("complete: status and xhr");
			console.log(status);
			console.log(xhr);
		}

		// PREVIOUS EXERCISES

		// load external data, log the result, and pass data to 
		// separate functions which use it to create page elements

		// modified to request data/products.php script 
		// instead of static data/products.json 
		$.getJSON("data/products.php", function(data, result) {
			console.log(result, data);
			loadItemSelector(data);
			loadItems(data);
		});

		// populate the #itemSelector select control
		function loadItemSelector(data) {
			var $option;
			$.each(data, function(index, item) {

				// create an option with both value and text for each item
				$option = $("<option>").prop("value", item.product.toLowerCase());
				$option.text(item.product);

				// add the new option to #itemSelector
				$("#itemSelector").append($option);

			});
		}

		// populate the items div with item elements including text, image, styles
		// and event handlers
		function loadItems(data) {
			var $div;
			$.each(data, function(index, item) {
				// create a new div with id, CSS classes, and item data
				$div = $("<div>").prop("id", item.product.toLowerCase());
				$div.addClass("item").addClass(item.department).addClass(item.status);
				$div.data(item);

				// create and configure img and p elements describing this item
				$img = $("<img>").prop("src", "images/" + item.image).prop("width", 200);
				$p = $("<p>").text(item.product + ": $" + item.price);

				// append the new img and p to this item div
				$div.append($img).append($p);

				// assign item a mouseover handler displaying its img in the #image element,
				// and a second handler to display the item name and price information
				$div.on("mouseover", function() {
					var path = $("img", this).prop("src");
					$("#image").prop("src", path);
				});
				$div.on("mouseover", displayPrice);

				// append the newly configured item to the #items div
				$("#items").append($div);

			});
		}

		// PREVIOUS EXERCISES

		// function to display name and price on mouseover
		var name, price, discount, discountPrice, priceDisplay;
		function displayPrice() {

			// get item name from the embedded item data
			name = $(this).data("product"); 

			// get price from this item's data, using method access
			price = $(this).data("price");

			// build default priceDisplay
			priceDisplay = "$" + price;

			// test whether this item is on sale
			if ($(this).hasClass("sale")) {

				// get discount percent for this item, by object access
				discount = $(this).data().discount;

				// calculated the discounted price to two decimal places
				discountPrice = (price - (price * discount)).toFixed(2);

				// using <strike> tag, build discounted priceDisplay
				priceDisplay = "<strike>" + priceDisplay + "</strike> $" + discountPrice;
			}
			// display message as html
			$("#message").html(name + " are only " + priceDisplay);
		}

		// filter items based on category selection
		$("#categories").change(function() {

			// update items display by excluding items not in selected category
			$("div.item").show();
			var category = $(this).val();
			if (category !== "all") {
				$("div.item").not("." + category).hide();
			}

		});

	});

})(jQuery);