<?php

require "dotenv.php";
require __DIR__ . '/vendor/autoload.php';

use Longman\TelegramBot\Request;
use Longman\TelegramBot\Telegram as TelegramBot;

(new DotEnv(__DIR__ . '/.env'))->load();

$bot_token = getenv("BOT_TOKEN");
$bot_name = getenv("BOT_NAME");
$game_name = getenv("GAME_NAME");
$game_url = getenv("GAME_URL");

$telegram = new TelegramBot($bot_token, $bot_name);

$baseurl = "https://api.telegram.org/bot" . $bot_token;
$update = file_get_contents("php://input");
$update_array = json_decode($update, true);

if (empty($update_array["score"])) {
    http_response_code(400);
    $error = new stdClass();
    $error->error = "No score submitted!";

    echo json_encode($error);
    return;
}

$response = post_highscore($baseurl, $update_array);
if ($response == true) {
    //setGameScore returns true on errors
    http_response_code(400);
    return $response;
} else {
    return $response;
}

function post_highscore($baseurl, $data)
{
    $id = $data["id"];
    $chat_id = $data["chat"];
    $user_id = $data["user"];

    $score = $data["score"];
    $legal_score = min($score, 5);

    //TODO finn ut hvorfor dette ikke fungerer.
    //var en annen som hadde problem med samme metode: https://github.com/php-telegram-bot/core/issues/1248

    return Request::setGameScore([
        'message_id' => $chat_id,
        'peer' => $chat_id,
        'user_id' => $user_id,
        'id' => $id,
        'edit_message' => 'true',
        'score' => $legal_score,
    ]);
}

?>