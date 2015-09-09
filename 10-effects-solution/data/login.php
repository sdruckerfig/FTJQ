<?php

	// create users array
	$users = array();
	$users["tinat"] = array("username" => "tinat", "password" => "password", "firstName" => "Tina", "lastName" => "Tourquoise", 
		"role"=> "Manager");
	$users["bobb"] = array("username" => "bobb", "password" => "password", "firstName" => "Bob", "lastName" => "Brown", 
		"role"=> "Contributor");
	$users["krishnak"] = array("username" => "krishnak", "password" => "password", "firstName" => "Krishna", "lastName" => "Kohl", 
		"role"=> "Contributor");

	// get posted username
	$username = strtolower($_GET["username"]);
	$password = $_GET["password"];

	// get user based on username
	$authenticating_user = $users[$username];

	// if user exists and correct password provided set login valid, else clear and set invalid
	if ($authenticating_user != NULL && $authenticating_user["password"] == $password) {
		$authenticating_user["login"] = "valid";
	} else {
		unset($authenticating_user);
		$authenticating_user["username"] = $username;
		$authenticating_user["password"] = $password;
		$authenticating_user["login"] = "invalid";
	}

	// encode result as JSON and return
	echo json_encode($authenticating_user);

?>