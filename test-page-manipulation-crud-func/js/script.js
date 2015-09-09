// Control jQuery $ reference and overall scope
(function($){

	// Run script after document is loaded and ready
	jQuery(document).ready(function () {

		$.getJSON("data/people.json", loadRoster);

		function loadRoster(data) {

			// create row for each item then append to table
			$.each(data, function(index, item) {
				var $row = createRow(item);
				$row.appendTo("#teamTable");
			});

		}

		// ************
		// Row creation

		function createRow(item) {

			// create new row
			$row = $("<tr>");

			// add controls cells
			$controls = $("<td>");

			// add blank control cell to row
			// $row.append($controls);

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

			// add unique ID to row to enable edits
			$row.prop("id", getUniqueId(item.lastName));

			return $row;
			
		}

		// create unique ID values by appending incrementing 
		// global counter value to a base string
		var uniqueIdCounter = 0;
		function getUniqueId(baseString) {
			return (baseString + uniqueIdCounter++);
		}

		function addDeleteButton($controls) {

			// create delete buttons
			$deleteButton = $("<button>").text("Delete")

			// attach handler to select parent <tr> and remove
			$deleteButton.on("click", handleCRUDclick);

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

			// attach editRow function as event handler
			$editButton.on("click", handleCRUDclick);
			$controls.append($editButton);
			return $controls;
		}



		// *****************************
		// Create/Update/Delete Handling

		$("#configureButton").click(handleCRUDclick);

		function handleCRUDclick(event) {

			// suppress form submission
			event.preventDefault();

			// get text of clicked button to identify action to take
			var action = $(event.target).text();
			var formData, $row;

			switch(action) {
				case "Create": {

					// gather form data then create new row
					formData = getFormData();
					$row = createRow(formData);

					// add new row to table
					$("#teamTable").append($row);

					clearForm();

					break;
				}
				case "Edit": {

					// get the row from which the button was clicked
					$row = $(event.target).parents("tr");

					copyRowToForm($row);

					break;
				}
				case "Update": {

					// gather form data then create new row
					formData = getFormData();
					$row = createRow(formData);					

					// find existing row by ID and replace with new row
					$("#" + formData.uniqueId).replaceWith($row);

					clearForm();

					// restore button to Create state
					$("#configureMember").find("button").text("Create");

					break;
				}
				case "Delete": {

					// select parent row of clicked Delete button
					// and remove it
					$(event.target).parents("tr").remove();

					break;
				}
			}

		}

		function getFormData() {

			// gather form info
			var formData = {};
			formData.firstName = $("input[name='firstName']").val();
			formData.lastName = $("input[name='lastName']").val();
			formData.role = $("select[name='role']").val();
			formData.uniqueId = $("input[name='uniqueId']").val();

			return formData;			
		}

		function copyRowToForm($row) {

			// get the values for this row, including uniqueId
			var firstName = $row.find(".firstName").text();
			var lastName = $row.find(".lastName").text();
			var role = $row.find(".role").text();
			var uniqueId = $row.prop("id");

			// assign row values to form fields, including uniqueId
			$("[name='firstName']").val(firstName);
			$("[name='lastName']").val(lastName);
			$("[name='role']").val(role);
			$("[name='uniqueId']").val(uniqueId);

			$("#configureMember").find("button").text("Update");
		}

		function clearForm() {

			// assign blank values to form fields, including uniqueId
			$("[name='firstName']").val("");
			$("[name='lastName']").val("");
			$("[name='role']").val("");
			$("[name='uniqueId']").val("");
		
		}

	});

})(jQuery);