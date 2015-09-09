
<?
	
	$inventory = array();
	$inventory["Buttons"] = array("product" => "buttons", "in-stock" => 117, "on-order" => 350);
	$inventory["Pencils"] = array("product" => "pencils", "in-stock" => 42, "on-order" => 25);
	$inventory["Glitter"] = array("product" => "glitter", "in-stock" => 94, "on-order" => 200);
	$inventory["Markers"] = array("product" => "markers", "in-stock" => 135, "on-order" => 150);
	$inventory["Flowers"] = array("product" => "flowers", "in-stock" => 11, "on-order" => 250);
	$inventory["Staples"] = array("product" => "staples", "in-stock" => 498, "on-order" => 750);

	echo "<div id='inventory'>";
	foreach (array_keys($inventory) as $key) {
		$item = $inventory[$key];
		echo "<div id='" . $item["product"] . "'>";
		echo "<p>" . $key . "<br/>";
		echo "<span id='in-stock'>In Stock: " . $item["in-stock"] . "</span> ";
		echo "<span id='on-order'>On Order: " . $item["on-order"] . "</span>";
		echo "</p>";
		echo "</div>";
	}
	echo "</div>";

?>

