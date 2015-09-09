// Control jQuery $ reference and overall scope
(function($){

	// Run script after document is loaded and ready
	jQuery(document).ready(function () {

		// EXERCISE 5 - Loading and using JSON data

		$.getJSON("data/products.json", function(data, status){
			console.log(data, status);
			loadItemSelector(data);
			loadItems(data);
		});	

		function loadItemSelector(data) {
			var $option;
			$.each(data, function(index, item) {
				$option = $("<option>").prop("value", item.product.toLowerCase());
				$option.text(item.product);
				$("#itemSelector").append($option);				
			});
		}
		function loadItems(data) {
			var $div;
			$.each(data, function(index, item) {
				$div = $("<div>").prop("id", item.product.toLowerCase());
				$div.addClass("item").addClass(item.department).addClass(item.status);
				$div.data(item);

				$img = $("<img>").prop("src", "images/" + item.image).prop("width", 200);
				$p = $("<p>").text(item.product + ": $" + item.price);
				$div.append($img).append($p);

				$div.on("mouseover", function(){
					var path = $("img", this).prop("src");
					$("#image").prop("src", path);
				});
				$div.on("mouseover", displayPrice);

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