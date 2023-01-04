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

$callback_query_id = $update_array["callback_query"]["id"];

if (!empty($callback_query_id)) {
    $chat_instance = $update_array["callback_query"]["chat_instance"];
    $user_id = $update_array["callback_query"]["from"]["id"];
    $language_code = $update_array["callback_query"]["from"]["language_code"];
    $message_id = $update_array["callback_query"]["message"]["message_id"];
    $chat_id = $update_array["callback_query"]["message"]["chat"]["id"];
    $inline_message_id = $update_array["callback_query"]["inline_message_id"];

    return Request::answerCallbackQuery([
        'callback_query_id' => $callback_query_id,
        'url' => $game_url . "#message=" . $message_id . "&inline=" . $inline_message_id . "&instance=" . $chat_instance .
            "&user=" . $user_id . "&chat=" . $chat_id . "&lang=" . $language_code,
    ]);
}


$from_chat = $update_array["message"]["chat"]["id"];
$text = $update_array["message"]["text"];

if (!empty($from_chat) && !empty($text)) {
    switch ($text) {

        case "/start@" . $bot_name:
        case "/start":
        case "/help@" . $bot_name:
        case "/help":
            return Request::sendMessage([
                'chat_id' => $from_chat,
                'text' => 'Try /game@' . $bot_name . ' to play in this chat' .
                    chr(10) .
                    chr(10) .
                    'Otherwise, click this link to share a game in another chat: https://telegram.me/' . $bot_name . '?game=' . $game_name,
            ]);

        case "/game@" . $bot_name:
        case "/game":
            return Request::sendGame([
                'chat_id' => $from_chat,
                'game_short_name' => $game_name,
            ]);

        default:
            return Request::sendMessage([
                'chat_id' => $from_chat,
                'text' => 'text="' . $text . '" is not recognized as a command. See /help for the list of available commands.',
            ]);
    }
}

$inline_query_id = $update_array["inline_query"]["id"];
$query = $update_array["inline_query"]["query"];

if (!empty($inline_query_id)) {
    return Request::answerInlineQuery([
        'inline_query_id' => $inline_query_id,
        'results' => [
            [
                'type' => 'game',
                'id' => $game_name,
                'game_short_name' => $game_name,
            ]
        ]
    ]);
}
