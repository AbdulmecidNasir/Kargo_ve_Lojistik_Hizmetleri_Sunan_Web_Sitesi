<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS başlıkları
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once('include/DB.php');

// POST verilerini logla
error_log("POST verisi alındı: " . print_r($_POST, true));

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $name = isset($_POST['name']) ? mysqli_real_escape_string($connection, $_POST['name']) : '';
        $email = isset($_POST['email']) ? mysqli_real_escape_string($connection, $_POST['email']) : '';
        $phone = isset($_POST['phone']) ? mysqli_real_escape_string($connection, $_POST['phone']) : '';
        $message = isset($_POST['message']) ? mysqli_real_escape_string($connection, $_POST['message']) : '';

        if (empty($name) || empty($email) || empty($phone) || empty($message)) {
            throw new Exception("All fields are required");
        }

        $query = "INSERT INTO contact_messages (name, email, phone, message) 
                  VALUES ('$name', '$email', '$phone', '$message')";
        
        error_log("SQL Query: " . $query);

        if (mysqli_query($connection, $query)) {
            error_log("Veri başarıyla kaydedildi");
            echo json_encode([
                'status' => 'success',
                'message' => 'Message saved successfully!'
            ]);
        } else {
            throw new Exception(mysqli_error($connection));
        }
    } catch (Exception $e) {
        error_log("Hata: " . $e->getMessage());
        echo json_encode([
            'status' => 'error',
            'message' => $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method'
    ]);
}
?>