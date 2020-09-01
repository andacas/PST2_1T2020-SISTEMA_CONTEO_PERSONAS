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
		$sql = "select * from informe where id = '$id' and fecha = '$fecha'";
		$r = mysqli_query($conn,$sql);
		$result = mysqli_fetch_array($r);
		
        if($result == null){
            echo "no existe";
        }else{
            echo "existe";
        }


}
$conn->close();
	
?>