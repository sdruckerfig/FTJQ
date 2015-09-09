
<?
	// create inventory array
	$inventory = array();
	$inventory["buttons"] = array("product" => "Buttons", "in-stock" => 117, "on-order" => 350);
	$inventory["pencils"] = array("product" => "Pencils", "in-stock" => 42, "on-order" => 25);
	$inventory["glitter"] = array("product" => "Glitter", "in-stock" => 94, "on-order" => 200);
	$inventory["markers"] = array("product" => "Markers", "in-stock" => 135, "on-order" => 150);
	$inventory["flowers"] = array("product" => "Flowers", "in-stock" => 11, "on-order" => 250);
	$inventory["staples"] = array("product" => "Staples", "in-stock" => 498, "on-order" => 750);

	// render one item in format shown in inventory_report.html
	function displayItem($inventory, $key) {
		$item = $inventory[$key];
		echo "<div id='" . $key . "'>";
		echo "<p>" . ucfirst($key) . "<br/>";
		echo "<span id='in-stock'>In Stock: " . $item["in-stock"] . "</span> ";
		echo "<span id='on-order'>On Order: " . $item["on-order"] . "</span>";
		echo "</p>";
		echo "</div>";
	}

	// get selected item passed by client, if any
	$selected_item = $_GET["item"];
	// render full or item-specific inventory report, in format shown in inventory_report.html
	echo "<div id='inventory'>";
		if ($selected_item != NULL) {
			// render selected item
			displayItem($inventory, $selected_item);
		} else {
			// render all items
			foreach (array_keys($inventory) as $key) {
				displayItem($inventory, $key);
			}		
		}
	echo "</div>";

?>

