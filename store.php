<?php

include_once 'db.php';

$pdo = new PDO('mysql:host=' . HOST . ';dbname=' . NAME, USER, PASS);

header('Access-Control-Allow-Origin: *');
$data = json_decode(file_get_contents("php://input"));

array_splice($data, 2, 0, array(date('Y-m-d H:i:s')));

// $out = fopen('data.csv', 'a+');
// fputcsv($out, $data);

$insert = $pdo->prepare('INSERT INTO `' . TABLE . '` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
$insert->execute($data);