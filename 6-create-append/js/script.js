// Control jQuery $ reference and overall scope
(function($){

	// Run script after document is loaded and ready
	jQuery(document).ready(function () {



		function createRow(item) {


			
		}

		// create unique ID values by appending incrementing 
		// global counter value to a base string
		var rowIdCounter = 0;
		function getRowId(baseString) {
			return (baseString + rowIdCounter++);
		}

		function addDeleteButton($controls) {
	
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



		});

	});

})(jQuery);