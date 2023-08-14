<?php

require "dotenv.php";
require __DIR__ . '/vendor/autoload.php';

use Longman\TelegramBot\Request;
use Longman\TelegramBot\Telegram as TelegramBot;

(new DotEnv(__DIR__ . '/.env'))->load();

$bot_token = getenv("BOT_TOKEN");
$bot_name = getenv("BOT_NAME");

$telegram = new TelegramBot($bot_token, $bot_name);

$update = file_get_contents("php://input");
$update_array = json_decode($update, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (empty($update_array["score"])) {
        http_response_code(400);
        $error = new stdClass();
        $error->error = "No score submitted!";

        echo json_encode($error);
        return;
    }

    if ($update_array["token"] != $bot_token) {
        http_response_code(400);
        $error = new stdClass();
        $error->error = "Incorrect token!";
        echo json_encode($error);
        return;
    }

    $response = post_highscore($update_array);

    if (!empty($response->getErrorCode())) {
        http_response_code($response->getErrorCode());
    }

    echo $response;
    return;
}


function post_highscore($data)
{
    $message_id = $data["message"];
    $chat_id = $data["chat"];
    $user_id = $data["user"];
    $inline_message_id = $data["inline"];

    $score = $data["score"];

    return Request::setGameScore([
        'user_id' => $user_id,
        'chat_id' => $chat_id,
        'message_id' => $message_id,
        'inline_message_id' => $inline_message_id,
        'score' => strval($score),
        'force' => 'true'
    ]);
}

?>