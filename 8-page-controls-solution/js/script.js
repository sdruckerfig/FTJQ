(function($){ 

	$(document).ready(function() {

		// $("#cities").menu();

		// $("#cities").accordion();
		// $("#cities").on("accordionactivate", function(event, ui){
		// 	$("#title").text(ui.newHeader.text());
		// });

		$("#cities").tabs();
		$("#cities").on("tabsactivate", function(event, ui){
			$("#title").text(ui.newTab.text());
		});

	});

})(jQuery);