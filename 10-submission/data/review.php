
<?php
	echo "<table>";
	foreach($_GET as $query_variable => $query_value) {
		echo "<tr><td>$query_variable</td><td>$query_value</td></tr>";
	}
	echo "</table>";
?>