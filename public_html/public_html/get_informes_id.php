<?php
$db_user="***";
$db_password="***";
$db_name="***";
$db_server="localhost";
 header("Access-Control-Allow-Origin: *"); 
 try{
  
  $DBcon = new PDO("mysql:host=$db_server;dbname=$db_name",$db_user,$db_password);
  $DBcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
 }catch(PDOException $ex){
  
  die($ex->getMessage());
 }
 if($_SERVER['REQUEST_METHOD']=='GET'){
		$id = $_GET['id'];
		$query = "select * from informe where id ='$id'";
     
$stmt = $DBcon->prepare($query);
$stmt->execute();
        $userData = array();

while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
  
      $userData[$row['id_informe']][] = $row;
 
}
echo json_encode($userData);
	
 }		
	
?>