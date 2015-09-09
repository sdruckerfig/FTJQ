// Control jQuery $ reference and overall scope
(function($){

	// Run script after document is loaded and ready
	jQuery(document).ready(function () {

		// EXERCISE 5 - Loading external content

		// handle #itemSelector change events
		$("#itemSelector").change(function() {

			// load and display full static inventory_report.html
			// $("#itemInventory").load("inventory_report.html");

			// load full static inventory_report.html, but display selected fragments (filter data on client)
			// $("#itemInventory").load("inventory_report.html #" + $(this).val() + " .in-stock");

			// get currently selected item in #itemSelector
			var selectedItem = $(this).val();

			// load full static inventory_report.html, display fragments, and mark displayed item using callback
			// $("#itemInventory").load("inventory_report.html #" + selectedItem, markReported(selectedItem));

			// load and display full dynamic inventory_report.php
			// $("#itemInventory").load("inventory_report.php");

			// load and display selected item from dynamic inventory_report.php (filter data on server)
			// $("#itemInventory").load("inventory_report.php?item=" + selectedItem, markReported(selectedItem));
			$("#itemInventory").load("inventory_report.php", "item=" + selectedItem, markReported(selectedItem));

		});
		// trigger change event on #itemSelector at startup
		$("#itemSelector").trigger("change");

		// mark selectedItem with bold font
		function markReported(selectedItem) {
			$("#" + selectedItem).css("font-weight", "bold");
		}

		// PREVIOUS EXERCISES

		// 1. when mousing over item, display its image in #image
		$(".item").mouseover(function() {
			var path = $("img", this).prop("src");
			$("#image").prop("src", path);
		});

		// 2. add inventory and discount data using Item objects
		$("#buttons").data(new Item("23", "2.95", ".15"));
		$("#pencils").data(new Item("42", "1.95", ".20"));
		$("#glitter").data(new Item("77", "0.95", ".10"));
		$("#markers").data(new Item("11", "3.95", ".15"));
		$("#flowers").data(new Item("98", "6.95", ".40"));
		$("#staples").data(new Item("55", "3.95", ".10"));

		// declare Item constructor
		function Item(inventory, price, discount) {
			this.inventory = inventory;
			this.price = price;
			this.discount = discount;
		}

		// 3. display name and price in message field
		// struck through and replaced by discountPrice, if on sale
		var name, price, discount, discountPrice, priceDisplay;
		$(".item").mouseover(function() {
			// get item name from displayed text
			name = $("#name", this).text();

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
		});


		// UNIT 3 EXERCISES - COMPLETE

		// 1. modify the background of odd number table rows
		$("#cart tr:odd").css("background-color", "#c9f0b1");

		// 2. toggle highlights on rows other than the total row
		$("#cart tr:not('.total')").click(function() {
			$(this).toggleClass("highlight");
		});

		// 3. filter items based on category selection
		$("#categories").change(function() {

			// update items display using a filter
			// $("div.item").hide();
			// var category = $(this).val();
			// var $items = $("div.item");
			// (category !== "all") ? $items.filter("." + category).show() : $items.show();

			// update items display by excluding items not in selected category
			$("div.item").show();
			var category = $(this).val();
			if (category !== "all") {
				$("div.item").not("." + category).hide();
			}

			// update items display by examining each item for the selected category
			// $(".item").each(function(index, element){
			// 	if (category === "all" || $(element).hasClass(category)) {
			// 		$(element).show();
			// 	} else {
			// 		$(element).hide();
			// 	}
			// });
		});



	});

})(jQuery);


