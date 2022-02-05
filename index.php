<?php

$env_file = file_get_contents(".env");

//env file only contains the telegram bot token
$bottoken = $env_file;

$baseurl = "https://api.telegram.org/bot".$bottoken;
$update = file_get_contents("php://input");
$update_array = json_decode($update, true);
?>

<head>
    <script src="https://telegram.org/js/games.js"></script>
</head>
<body>
    <p>Здесь будет игра.</p>
    <button onclick="TelegramGameProxy.shareScore()">Share score</button>
</body>