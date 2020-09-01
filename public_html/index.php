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
		$query = "select * from local";
     
$stmt = $DBcon->prepare($query);
$stmt->execute();
        $userData = array();

while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
  
      $userData[$row['id']][] = $row;
 
}
echo json_encode($userData);
	
		
	
?>
