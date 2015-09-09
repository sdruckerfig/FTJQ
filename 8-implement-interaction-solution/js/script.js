(function($){ 

	$(document).ready(function() {

		$("#peopleTable").selectable({filter:"tr"});

		$("#peopleTable").on("selectableselecting", function(event, ui) {
			$("#editTable").empty();
		});

		$("#peopleTable").on("selectableselected", function(event, ui){
			$selectedRow = $(ui.selected);
			console.log(ui);
			console.log($selectedRow);

			firstName = $selectedRow.find("td.firstName").text();
			lastName = $selectedRow.find("td.lastName").text();
			role = $selectedRow.find("td.role").text();

			$editRow = $("<tr>")
			$("<input type='text' name='firstName'/>").val(firstName).appendTo("<td/>").appendTo($editRow);
			$("<input type='text' name='lastName'/>").val(lastName).appendTo("<td/>").appendTo($editRow);
			$("<input type='text' name='role'/>").val(role).appendTo("<td/>").appendTo($editRow);
			$editRow.appendTo("#editTable");

		});

		// 	$editRow = $("<tr>")
		// 	$("<input type='text' name='firstName'/>").val(firstName).appendTo("<td/>").appendTo($editRow);
		// 	$("<input type='text' name='lastName'/>").val(lastName).appendTo("<td/>").appendTo($editRow);
		// 	$("<input type='text' name='role'/>").val(role).appendTo("<td/>").appendTo($editRow);
		// 	$editRow.appendTo("#editTable");

	});

})(jQuery);