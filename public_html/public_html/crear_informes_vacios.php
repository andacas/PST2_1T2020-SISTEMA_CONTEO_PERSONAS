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
        $sql = "INSERT INTO informe (fecha, conteo_diario, id)
VALUES ('$fecha', 0 , '$id')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
}
$conn->close();
?>
