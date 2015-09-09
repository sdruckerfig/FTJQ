// Control jQuery $ reference and overall scope
(function($){

	// Run script after document is loaded and ready
	jQuery(document).ready(function () {

		$("#selectElements").click(function() {
			
			// move and/or copy all images
			// var $images = $("img");
			// $images.appendTo("#container2");
			// $images.clone().appendTo("#container2");

			// move all items
			// $(".item").appendTo("#container2");

			// move all office class divs
			// $("div.office").appendTo("#container2");

			// modify sale item background color
			$(".item.sale").css("background-color", "#cf4d47")

		});

	});

})(jQuery);


