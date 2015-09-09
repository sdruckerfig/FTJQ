// Control jQuery $ reference and overall scope
(function($){

	// Run script after document is loaded and ready
	jQuery(document).ready(function () {

		// EXERCISE 5 - Loading and using JSON data


		


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