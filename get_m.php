<?php

date_default_timezone_set("Asia/Makassar");

include_once 'db.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$pdo = new PDO('mysql:host=' . HOST . ';dbname=' . NAME, USER, PASS);

if (isset($_REQUEST['store'])) {
    $data = json_decode(file_get_contents("php://input"));
    array_splice($data, 1, 0, array(date('Y-m-d H:i:s')));

    $update = $pdo->prepare('UPDATE `' . TABLE . '` SET `title` = ?, `date` = ?, `duration` = ?, `publish` = ?, `views` = ?, `likes` = ?, `dislikes` = ?, `comments` = ? WHERE `id` = ?');
    $update->execute($data);
}

$get = $pdo->prepare('SELECT id FROM `' . TABLE . '` WHERE title IS NULL ORDER BY RAND() LIMIT 0, 1');
$get->execute();

echo json_encode($get->fetch(PDO::FETCH_ASSOC));