// Control jQuery $ reference and overall scope
(function($){

	// Run script after document is loaded and ready
	jQuery(document).ready(function () {

		$.getJSON("data/people.json", loadRoster);

		function loadRoster(data) {

			$.each(data, function(index, item) {
				var $row = createRow(item);
				$row.appendTo("#rosterTable");
			});

		}

		function createRow(item) {

			// create new row
			$row = $("<tr>");

			// add controls cells
			$controls = $("<td class='controls'>");

			// add blank control cell to row
			// $row.append($controls);

			// add team assignment checkbox
			$controls.append($("<input type='checkbox' class='team' />"));

			// add moveup button
			$controls = addMoveupButton($controls);

			// add remove button
			$controls = addDeleteButton($controls);

			// add edit button
			$controls = addEditButton($controls);

			// append controls (child) to row (parent)
			// $controls.appendTo($row);
			// parent (row) appends controls (child)
			$row.append($controls);

			// add data cells, assigning appropriate class
			$("<td>").addClass("firstName").text(item.firstName).appendTo($row);
			$("<td>").addClass("lastName").text(item.lastName).appendTo($row);
			$("<td>").addClass("role").text(item.role).appendTo($row);

			// add user name based ID to row to enable edits
			$row.prop("id", getRowId(item.lastName));

			return $row;
			
		}

		// create unique ID values by appending incrementing 
		// global counter value to a base string
		var rowIdCounter = 0;
		function getRowId(baseString) {
			return (baseString + rowIdCounter++);
		}

		function addDeleteButton($controls) {
			// create remove buttons with "X"
			$deleteButton = $("<button>").text("Delete")

			// attach handler to select parent <tr> and remove
			$deleteButton.on("click", function() {
				$(this).parents("tr").remove();
			});

			// parent appends child
			$controls.append($deleteButton);
			return $controls;		
		}

		function addMoveupButton($controls) {
			// create remove button with "^"
			$moveupButton = $("<button>").text("^");

			// attach handler to select button's parent row
			// then insert it before its previous row unless
			// previous row has the headerRow class
			$moveupButton.on("click", function() {

				// search all parents for the next tr
				$thisRow = $(this).parents("tr");

				// get the previous row to this row
				$previousRow = $thisRow.prev();

				// if it's not the header row, move this row up
				if (!($previousRow.hasClass("headerRow"))) {
					$thisRow.insertBefore($previousRow);
				}
			});

			// child appends to parent
			$moveupButton.appendTo($controls);
			return $controls;
		}

		function addEditButton($controls) {
			// create edit button with "Edit"
			$editButton = $("<button>").text("Edit")

			// attach copyRowToForm function as event handler
			$editButton.on("click", copyRowToForm);
			$controls.append($editButton);
			return $controls;
		}

		// FORM MANAGEMENT

		function copyRowToForm(event) {

			// get the row from which the button was clicked
			$row = $(event.target).parents("tr");

			// get the values for this row, including rowId
			var firstName = $row.find(".firstName").text();
			var lastName = $row.find(".lastName").text();
			var role = $row.find(".role").text();
			var rowId = $row.prop("id");

			// assign row values to form fields, including rowId
			$("[name='firstName']").val(firstName);
			$("[name='lastName']").val(lastName);
			$("[name='role']").val(role);
			$("[name='rowId']").val(rowId);
			$("#configureMember").find("button").text("Update");
		}

		function clearForm() {

			// assign blank values to form fields, including rowId
			$("[name='firstName']").val("");
			$("[name='lastName']").val("");
			$("[name='role']").val("");
			$("[name='rowId']").val("");
		}

		// EVENT HANDLING

		$("#createTeamButton").click(function(event) {
			
			// get team name
			var teamName = $("input[name='teamName']").val();

			// clone checked rows, wrap in new table, select new table, and assign to $newTable
			$newTable = $(".team:checked").parents("tr").clone().wrapAll("<table class='tableDisplay' />").parents("table");

			// replace the controls with a blank cell
			$newTable.find(".controls").replaceWith("<td />");

			// add team name as caption
			$newTable.prepend("<caption>" + teamName + "</caption>");
			$newTable.insertAfter("#rosterTable");

			// reset roster checkboxes and team name field
			$(".team:checked").prop("checked", false);
			$("input[name='teamName']").val("");
		});

		$("#configureButton").click(function(event) {
			event.preventDefault();
			var action = $(this).text();

			// gather form info
			var formData = {};
			formData.firstName = $("input[name='firstName']").val();
			formData.lastName = $("input[name='lastName']").val();
			formData.role = $("select[name='role']").val();
			formData.rowId = $("input[name='rowId']").val();

			// create a row for this formData
			$row = createRow(formData);

			if (action === "Create") {

				// append new row to table
				$("#rosterTable").append($row);
				clearForm();

			} else if (action === "Update") {

				// find existing row by ID and replace with new row
				// because of duplication, may find multiple common ids
				$row.replaceAll("tr[id='" + formData.rowId + "']");
				clearForm();

				// restore button to Create state
				$("#configureMember").find("button").text("Create");
			}

		});

	});

})(jQuery);