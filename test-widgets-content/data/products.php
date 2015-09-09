
<?
	// create inventory array
	$inventory = array();
	$inventory["buttons"] = array("product" => "Buttons", "price" => "2.95", "image" => "buttons.jpg", "department" => "home", 
		"status"=> "full-price", "inventory" => 117, "discount" => .15);
	$inventory["pencils"] = array("product" => "Pencils", "price" => "1.95", "image" => "pencils.jpg", "department" => "office", 
		"status"=> "sale", "inventory" => 42, "discount" => .20);
	$inventory["glitter"] = array("product" => "Glitter", "price" => "0.95", "image" => "glitter.jpg", "department" => "home", 
		"status"=> "full-price", "inventory" => 94, "discount" => .10);
	$inventory["markers"] = array("product" => "Markers", "price" => "3.95", "image" => "markers.jpg", "department" => "office", 
		"status"=> "full-price", "inventory" => 135, "discount" => .15);
	$inventory["flowers"] = array("product" => "Flowers", "price" => "4.95", "image" => "flowers.jpg", "department" => "home", 
		"status"=> "full-price", "inventory" => 11, "discount" => .40);
	$inventory["staples"] = array("product" => "Staples", "price" => "0.95", "image" => "staples.jpg", "department" => "office", 
		"status"=> "sale", "inventory" => 498, "discount" => .10);

	// delay response 5 seconds to explore jQuery ajax request timeout handling
	// sleep(5);

	$selected_item = $_GET["item"];
	// $selected_item = $_POST["item"];
	// if item parameter provided, filter array to return only that item, else return all items
	if ($selected_item != NULL) {
		// create new array to wrap filtered item (client requires array result)
		$result_array = array();
		$item = $inventory[$selected_item];
		array_push($result_array, $item);
	} else {
		// assign existing $inventory array as $result_array
		$result_array = $inventory;		
	}
	// encode $result_array as JSON and return
	echo json_encode($result_array);
?>

