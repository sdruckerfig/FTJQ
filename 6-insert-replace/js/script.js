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

			var $row = $("<tr/>");
			var $controls = $("<td class='controls'/>");
			$controls = addDeleteButton($controls);

			$row.append($controls);

			$("<td/>").addClass("firstName").text(item.firstName).appendTo($row);
			$("<td/>").addClass("lastName").text(item.lastName).appendTo($row);
			$("<td/>").addClass("role").text(item.role).appendTo($row);

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

			$deleteButton = $("<button>").text("Delete");
			$deleteButton.on("click", function() {
				$(this).parents("tr").remove();
			});
			$deleteButton.appendTo($controls);
			return $controls;
		}

		function addMoveupButton($controls) {

		}

		function addEditButton($controls) {

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

			if(action === "Create") {
				$("#rosterTable").append($row)
				clearForm();
			}



		});

	});

})(jQuery);