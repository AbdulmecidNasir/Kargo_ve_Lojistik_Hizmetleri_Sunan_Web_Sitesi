<?php 
require_once("DB.php");

global $connection;

// Değişken ismi düzeltildi ve connection parametresi eklendi
$query = "SELECT * FROM constantfields WHERE name='gstrate'";
$execute = mysqli_query($connection, $query);
$row = mysqli_fetch_assoc($execute);

$gstRate = $row["value"];

$query = "SELECT * FROM constantfields WHERE name='perkgcost'";
$execute = mysqli_query($connection, $query);
$row = mysqli_fetch_assoc($execute);

$perKgCost = $row["value"];

$query = "SELECT * FROM constantfields WHERE name='perdocketcharge'";
$execute = mysqli_query($connection, $query);
$row = mysqli_fetch_assoc($execute);

$perDocketCharge = $row["value"];

$query = "SELECT * FROM constantfields WHERE name='perodacharge'";
$execute = mysqli_query($connection, $query);
$row = mysqli_fetch_assoc($execute);

$perODACharge = $row["value"];

$countElements = 0;