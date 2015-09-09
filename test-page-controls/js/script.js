(function($){ 

	$(document).ready(function() {

		$("#cities").accordion();
		$("#cities").on("accordionactivate", function(event, ui){
			console.log(ui.newHeader.text());
			$("#title").text(ui.newHeader.text());
		});

		// $("#cities").menu();

		// $("#cities").tabs();
		// $("#cities").on("tabsactivate", function(event, ui){
		// 	console.log(ui.newTab.text());
		// 	$("#title").text(ui.newTab.text());
		// });

	});

})(jQuery);