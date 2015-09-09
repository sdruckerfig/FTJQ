// Control jQuery $ reference and overall scope
(function($){

	// Run script after document is loaded and ready
	jQuery(document).ready(function () {

		$("#selectCategory").change(function() {

			// using jQuery's built in selection iteration
			$(".item").show();
			var category = $(this).val();
			if (category != "all") {
				var selector = ".item:not(." + category + ")";
				$(selector).hide();
			}

			// using explicit selection iteration
			// $(".item").each(function(index, element){
			// 	if (category === "all" || $(element).hasClass(category)) {
			// 		$(element).show();
			// 	} else {
			// 		$(element).hide();
			// 	}
			// });
		})

	});

})(jQuery);


