// Control jQuery $ reference and overall scope
(function($){

	// Run script after document is loaded and ready
	jQuery(document).ready(function () {

		// UNIT 4 EXERCISES - COMPLETE

		// 1. when mousing over item, display its image in #image


		// 2. add inventory and discount data using Item objects


		// $("#pencils").data(new Item("42", "1.95", ".20"));
		// $("#glitter").data(new Item("77", "0.95", ".10"));
		// $("#markers").data(new Item("11", "3.95", ".15"));
		// $("#flowers").data(new Item("98", "6.95", ".40"));
		// $("#staples").data(new Item("55", "3.95", ".10"));

		// declare Item constructor


		// 3. display name and price in message field
		// struck through and replaced by discountPrice, if on sale





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


