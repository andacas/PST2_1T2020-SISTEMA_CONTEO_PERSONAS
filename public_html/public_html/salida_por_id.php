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
		$sql1 = "select * from local where id = '$id'";
		$r = mysqli_query($conn,$sql1);
		$result = mysqli_fetch_array($r);
		
	

	if($result['numero_personas'] > 0){ 
		$sql = "UPDATE local SET numero_personas=numero_personas-1 WHERE id = '$id'";
if ($conn->query($sql) === TRUE) {
  echo "Record updated successfully";
} else {
  echo "Error updating record: " . $conn->error;
}
}
}
$conn->close();
	
?>