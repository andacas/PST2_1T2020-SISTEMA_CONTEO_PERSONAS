<?php
$db_user="***";
$db_password="***";
$db_name="***";
$db_server="localhost";

$conn = new mysqli($db_server, $db_user, $db_password, $db_name);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
if($_SERVER['REQUEST_METHOD']=='GET'){
		$id = $_GET['id'];
		$fecha = $_GET['fecha'];
		$sql1 = "select * from local where id = '$id'";
		$sql2 = "select * from informe where id = '$id' and fecha = '$fecha'";
		$r = mysqli_query($conn,$sql1);
		$result = mysqli_fetch_array($r);
		$r2 = mysqli_query($conn,$sql2);
	    $result2 = mysqli_fetch_array($r2);

	if($result['numero_personas'] + 1 <= $result['numero_max']){ 
		$sql = "UPDATE local SET numero_personas=numero_personas+1 WHERE id = '$id'";
		$sql2 = "UPDATE informe SET conteo_diario=conteo_diario+1 WHERE id = '$id' and fecha = '$fecha'";
		
if ($conn->query($sql) === TRUE) {
  echo "Record updated successfully";
} else {
  echo "Error updating record: " . $conn->error;
}
if ($conn->query($sql2) === TRUE) {
  echo "Record updated successfully";
} else {
  echo "Error updating record: " . $conn->error;
}

	
}
}
$conn->close();
	
?>