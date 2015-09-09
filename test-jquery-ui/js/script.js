(function($){ 

	$(document).ready(function() {

		// initialize selectable with filter object
		$("#peopleTable").selectable({filter:"tr"});

		$("#peopleTable").on("selectableselecting", function(event, ui) {
			$("#editTable").empty();
		});

		$("#peopleTable").on("selectableselected", function(event, ui){
			$selectedRow = $(ui.selected);
			firstName = $selectedRow.find("td.firstName").text();
			lastName = $selectedRow.find("td.lastName").text();
			role = $selectedRow.find("td.role").text();

			$editRow = $("<tr>")
			$("<input type='text' name='firstName'/>").val(firstName).appendTo("<td/>").appendTo($editRow);
			$("<input type='text' name='lastName'/>").val(lastName).appendTo("<td/>").appendTo($editRow);
			$("<input type='text' name='role'/>").val(role).appendTo("<td/>").appendTo($editRow);
			$editRow.appendTo("#editTable");
		});

	});

})(jQuery);