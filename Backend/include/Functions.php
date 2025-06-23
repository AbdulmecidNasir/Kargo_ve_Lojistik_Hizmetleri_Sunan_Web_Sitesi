<?php ob_start(); ?>
<?php require_once("DB.php"); ?>
<?php require_once("Sessions.php"); ?>

<?php
function Redirect_to($New_Location)
{
    header("Location:".$New_Location);
	die($New_Location);
}

function Login_Attempt($Username, $Password) {
    global $connection;
    
    // Debug bilgileri
    error_log("Login Attempt - Username: " . $Username);
    
    $Query = "SELECT * FROM registration WHERE username='$Username'";
    error_log("SQL Query: " . $Query);
    
    $Execute = mysqli_query($connection, $Query);
    
    if (!$Execute) {
        error_log("SQL Error: " . mysqli_error($connection));
        return null;
    }
    
    $admin = mysqli_fetch_assoc($Execute);
    
    if ($admin) {
        error_log("User found in database");
        error_log("Stored password: " . $admin['password']);
        
        // Basit karşılaştırma yapalım (geçici olarak)
        if ($admin['password'] === $Password) {
            error_log("Password matches!");
            return $admin;
        } else {
            error_log("Password does not match");
            error_log("Input password: " . $Password);
            error_log("Stored password: " . $admin['password']);
        }
    } else {
        error_log("No user found with username: " . $Username);
    }
    
    return null;
}

function User_Exist($Username){
    global $connection;
    $Query="SELECT * FROM registration WHERE username='$Username'";
    $Execute=mysqli_query($connection, $Query);

    if($user_exist=mysqli_fetch_assoc($Execute)){
        return true;
    }
    else{
        return false;
    }
}

function Login(){
    if(isset($_SESSION["User_Id"])){
        return true;
    }
}

function Confirm_Login(){
    if(!Login()){
        $_SESSION["ErrorMessage"]="Login Required!";
        Redirect_to("Login.php");
    }
}

function encrypt_password($Password){

        $New_password = password_hash($Password, PASSWORD_DEFAULT);
        return $New_password;
}



?>
