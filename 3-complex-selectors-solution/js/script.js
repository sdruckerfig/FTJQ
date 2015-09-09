// Control jQuery $ reference and overall scope
(function($){

	// Run script after document is loaded and ready
	jQuery(document).ready(function () {

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


