<?php
$connection = mysqli_connect("localhost", "root", "", "theunite_unitedcargo");

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}