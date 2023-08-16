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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (empty($update_array["score"])) {
        http_response_code(400);
        $error = new stdClass();
        $error->error = "No score submitted!";

        echo json_encode($error);
        return;
    }

    if (!passes_identification_check($update_array)) {
        http_response_code(403);
        $error = new stdClass();
        $error->error = "This looks like identify theft!";

        echo json_encode($error);
        return;
    }

    if (!passes_cheat_check($update_array)) {
        http_response_code(403);
        $error = new stdClass();
        $error->error = "This looks like cheating!";

        echo json_encode($error);
        return;
    }

    $response = post_highscore($update_array);

    if (!empty($response->getErrorCode())) {
        http_response_code($response->getErrorCode());
    }

    echo $response;
    return;
} else {
    $query_params = array(
        "chat_id" => $_GET["chat"],
        "user_id" => $_GET["user"],
        "message_id" => $_GET["message"],
        "inline_id" => $_GET["inline"],
    );

    $highscores = get_highscores($query_params);

    if (!empty($highscores->getErrorCode())) {
        http_response_code($highscores->getErrorCode());
    }

    echo $highscores;
    return;
}

function passes_identification_check($data)
{
    global $bot_token;
    $chat_id = $data["chat"];
    $user_id = $data["user"];
    $user_secret = $data["user_secret"];

    return $user_secret == md5($user_id . $chat_id . $bot_token);
}

function passes_cheat_check($data)
{
    $chat = intval($data["chat"]);
    $user_id = intval($data["user"]);
    $score = $data["score"];

    $anti_cheat_value = (($chat - $user_id - $score * 286) % 98765);

    return $data["anti_cheat_token"] == $anti_cheat_value;
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
        'force' => 'false'
    ]);
}

function get_highscores($data)
{
    $chat_id = $data["chat_id"];
    $user_id = $data["user_id"];
    $message_id = $data["message_id"];
    $inline_id = $data["inline_id"];

    return Request::getGameHighScores([
        'chat_id' => $chat_id,
        'user_id' => $user_id,
        'message_id' => $message_id,
        'inline_message_id' => $inline_id,
    ]);
}

?>