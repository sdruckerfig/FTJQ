(function($){

	$(document).ready(function() {

		var productData, winnersArray, choicesArray;
		loadProductImages();





		$("#checkButton").click(function(event){

			var choice;
			var win = true;

			// check if either choice is not in winners array
			for (var i = 0; i < choicesArray.length; i++) {
				if (winnersArray.indexOf(choicesArray[i]) === -1) {
					win = false;
					break;
				}
			}

			// assign and display message whether win is true or false
			var winMessage = win ? "</br>You win!" : "</br>You lose.";
			$("#messageDiv").append(winMessage);

			// fade images because game is over
			$("#productsDiv").css("opacity", "0.5");

		});

		function handleImageClick(event) {

			// get the product data associated with this image
			var product = $(this).data("product");

			// save and display the choice
			choicesArray.push(product);
			$("#messageDiv").append("<br/>You chose: " + product);

		}

		function setNewGame() {

			// remove fade from the images
			$("#productsDiv").css("opacity", "1.0");

			// clear display and set initial message
			$("#messageDiv").empty();
			$("#messageDiv").append("<br/>Choose two products");

			// reset the winners and choices arrays
			winnersArray = chooseWinners(winnersArray, productData);
			console.log(winnersArray);
			choicesArray = [];		

		}

		// create array of two non-duplicate products
		function chooseWinners(winnersArray, productData) {

			// create copy of product data for destructive splicing in this method
			var productDataCopy = $.extend([], productData);

			// clear the winners array
			winnersArray = [];
			
			// get random index baesd on number of available products
			var winner1index = Math.floor(Math.random() * productDataCopy.length);
			
			// splice name of first randomly selected item into winners array
			winnersArray.push(productDataCopy.splice(winner1index, 1)[0].product);
			
			// get new random index based on the remaining products
			var winner2index = Math.floor(Math.random() * productDataCopy.length);
			
			// add second name to array, then return
			winnersArray.push(productDataCopy.splice(winner2index, 1)[0].product);
			
			return winnersArray;
		}

		function loadProductImages() {
			// load data
			$.getJSON("data/products.json", function(data) {

				// make data globally available
				productData = data;
				
				// loop over data to create, configure, and appends images for display
				$.each(data, function(index, item){
					$img = $("<img>").prop("src", "images/" + item.image).prop("width", "150").addClass("product").data("product", item.product);
					$("#productsDiv").append($img);
				});



			});

			// initially fade the images
			$("#productsDiv").css("opacity", "0.5");

		}

	});
	
})(jQuery);