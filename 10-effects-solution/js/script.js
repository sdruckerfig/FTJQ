(function($) {

	$(document).ready(function(){


		$("#loginform").effect("slide", {direction: "up"});


		$("#submit").on("click", function(event){
			event.preventDefault();

			var username = $("#username").val();
			$("#username").val("");

			var password = $("#password").val();
			$("#password").val("");

			$.ajax({
				url: "data/login.php",
				type: "GET",
				contentType: "application/json",
				data: {
					username: username,
					password:password
				},
				success: loginHandler,
				error: errorHandler
			});

		});

		function loginHandler(result) {
			console.log(result);
			var user = $.parseJSON(result);
			$("#result").text("");
			if (user.login === "valid") {
				$("#result").text(user.firstName + " " + user.lastName + " authenticated");
				$("#loginform").effect("bounce");
				$("#result").effect("pulsate", {times: 7});
			} else {
				$("#loginform").effect("shake");
			}
		}
		function errorHandler(result) {
			console.log(result)
		}

		// configure submit button for jQuery UI
		$("#submit").button();

	});

})(jQuery);