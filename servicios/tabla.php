<?php
header('Access-Control-Allow-Origin: *');
// Replace the value of these variables with your own data
$user = 'dba';
$pass = 'lomaserver';
$server = 'lomalocal';
$database = 'loma_reducido';

// No changes needed from now on
$connection_string = "DRIVER={Adaptive Server Anywhere 7.0};SERVER=$server;DATABASE=$database"; 
$conn = odbc_connect($connection_string,$user,$pass);

if ($conn) {
     // Query
	$qry = 'SELECT * FROM "DBA"."v_pantalla_taller" WHERE fechahoraini IS NOT NULL ORDER BY fechahoraini ASC';
	  // Get Result
	$result = odbc_exec($conn,$qry);
	  // Get Data From Result
	while ($data[] = odbc_fetch_array($result));

	 // Query
	$qry = 'SELECT * FROM "DBA"."v_pantalla_taller" WHERE fechahoraini IS NULL ORDER BY "transaccion" ASC';
	  // Get Result
	$result = odbc_exec($conn,$qry);
	  // Get Data From Result
	while ($data[] = odbc_fetch_array($result));

	// Free Result
	odbc_free_result($result);		

	// Close Connection
	odbc_close($conn);
	// Show data		
	echo json_encode($data);
} else{
    die("Connection could not be established.");
}
	