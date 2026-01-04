<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'db.php'; 

try {
    $stmt = $conn->prepare("SELECT * FROM orders ORDER BY id DESC"); 
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
} catch(PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>   