<?php

$ciudad = $_POST['ciudad'];
$tipo = $_POST['tipo'];

$filtro = array('c'=>$ciudad, 't'=>$tipo);
header("Content-Type: application/json");

echo json_encode($filtro);

?>