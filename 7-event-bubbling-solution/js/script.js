(function($){ 

	$(document).ready(function() {

		// $(".number").wrapInner("<a href='#' class='numberAnchor' />");
		$(".operator").wrapInner("<a href='#' class='operatorAnchor' />");

		var numbers = [];
		var numberString = "";
		var operator = "";
		var previousOperator = "";

		$("table").on("click", "td.number", function(event) {
		// $("td.number").on("click", function(event) {
		// $(".numberAnchor").on("click", function(event){

			// prevent page reload by anchor
			event.preventDefault();

			// clear prior results, if any
			$("#result").text("");

			// append sequentially clicked numbers as a string
			numberString += $(this).text();

			// disply current number
			$("#display").text(numberString);

		});
		
		$(".operatorAnchor").on("click", function(event){

			// prevent page reload by anchor
			event.preventDefault();

			// track previous operator for when = is clicked
			previousOperator = operator;

			// track the most recently selected operator
			operator = $(this).text();

			// because operator selected, parse numberString and 
			// add resulting number to numbers array
			numbers.unshift(parseInt(numberString));

			// reset numberString to begin new number
			numberString = "";

			if (operator === "=") {
				// operate on the two most recent numbers using
				// operator selected previous to =
				var result;
				switch (previousOperator) {
					case "+" : {
						result = numbers[1] + numbers[0];
						break;
					}
					case "-" : {
						result = numbers[1] - numbers[0];
						break;
					}
					case "*" : {
						result = numbers[1] * numbers[0];
						break;
					}
					case "/" : {
						result = numbers[1] / numbers[0];
						break;
					}
				}

				// clear the display and show the result
				$("#display").text("");
				$("#result").text(result);

				// reset numberString and numbers array
				numberString = "";
				numbers = [];				
			}

		});

	});

})(jQuery);