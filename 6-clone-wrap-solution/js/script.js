// Control jQuery $ reference and overall scope
(function($){

	// Run script after document is loaded and ready
	jQuery(document).ready(function () {

		// load external data 
		$.getJSON("data/people.json", function(data) {
			$.each(data, function(index, item) {
				
				// create a row for each item and append it to the table
				createRow(item).appendTo("#rosterTable");
			});
		});

		function createRow(item) {

			// create new row element
			var $row = $("<tr/>");

			// create new cell elements
			var $controls = $("<td class='controls'/>");

			// append team checkbox
			$controls.append($("<input type='checkbox' class='team' />"));

			// assign delete button to cell
			$controls = addDeleteButton($controls);

			// assign move up button to cell
			$controls = addMoveupButton($controls);

			// assign edit button to cell
			$controls = addEditButton($controls);

			// append cell to row
			$row.append($controls);

			// populate cells with item properties and append to row
			$("<td/>").addClass("firstName").text(item.firstName).appendTo($row);
			$("<td/>").addClass("lastName").text(item.lastName).appendTo($row);
			$("<td/>").addClass("role").text(item.role).appendTo($row);

			// assig unique id to row
			$row.prop("id", getRowId(item.lastName));

			// return row
			return $row;
			
		}

		// create unique ID values by appending incrementing 
		// global counter value to a base string
		var rowIdCounter = 0;
		function getRowId(baseString) {
			return (baseString + rowIdCounter++);
		}

		function addDeleteButton($controls) {

			// create new button with Delete as text 
			$deleteButton = $("<button>").text("Delete");

			// assign event handler to new button
			$deleteButton.on("click", function() {

				// select the tr surround this button
				$(this).parents("tr").remove();
			});

			// append this button to the controls cell
			$deleteButton.appendTo($controls);

			// return the modified cell
			return $controls;
		}

		function addMoveupButton($controls) {

			// create new button with ^ as text
			$moveupButton = $("<button>").text(" ^ ");

			// assign click event handler to new button 
			$moveupButton.on("click", function() {

				// select the table row surround this button
				$thisRow = $(this).parents("tr");

				// select the previous row of this table row
				$previousRow = $thisRow.prev();

				// if the previous row is not the header
				// insert this row before it
				if(!($previousRow.hasClass("headerRow"))) {
					$thisRow.insertBefore($previousRow);
				}
			});

			// append the new button to the cell and return the cell
			$controls.append($moveupButton);
			return $controls;
		}

		function addEditButton($controls) {

			// create a new button with Edit as text 
			$editButton = $("<button>").text("Edit");

			// assign copyRowToForm as its click handler
			$editButton.on("click", copyRowToForm);

			// return the controls cell with this button appended
			return $controls.append($editButton);
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

			// get table rows containing checked team checkboxes
			var $selectedRows = $(".team:checked").parents("tr");

			// clone the selected rows
			var $clonedRows = $selectedRows.clone(true);

			// wraps the selected rows in a new table, then get a reference to the new table
			$newTable = $clonedRows.wrapAll("<table class='tableDisplay'/>").parents("table");

			// prepend a caption in the new table
			$newTable.prepend("<caption>" + teamName + "</caption>");

			// insert the new table below the roster table
			$newTable.insertAfter("#rosterTable");

			// clear the form by unchecking the rows and clearing the team name field
			$(".team:checked").prop("checked", false);
			$("input[name='teamName']").val("");

			// console.log($selectedRows);
			// console.log($newTable);
		});

		$("#configureButton").click(function(event) {

			// prevent form submission
			event.preventDefault();

			// get button text to indicate action to be taken
			var action = $(this).text();

			// gather form info
			var formData = {};
			formData.firstName = $("input[name='firstName']").val();
			formData.lastName = $("input[name='lastName']").val();
			formData.role = $("select[name='role']").val();
			formData.rowId = $("input[name='rowId']").val();

			var $row = createRow(formData);

			// if the button says Create, append the row and clear the form
			if(action === "Create") {
				$("#rosterTable").append($row)
				clearForm();
			} else if(action === "Update") {
				// if Update, replace all rows with matching rowId with this new row
				$row.replaceAll("tr[id='" + formData.rowId + "']");

				// clear the form and reset the button text from Update to Create
				clearForm();
				$("#configureMember").find("button").text("Create");
			}

		});

	});

})(jQuery);