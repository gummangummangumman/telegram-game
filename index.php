<?php

require "dotenv.php";

(new DotEnv(__DIR__ . '/.env'))->load();

$bot_token = getenv("BOT_TOKEN");
$bot_name = getenv("BOT_NAME");
$game_name = getenv("GAME_NAME");
$game_url = getenv("GAME_URL");

$baseurl = "https://api.telegram.org/bot".$bot_token;
$update = file_get_contents("php://input");
$update_array = json_decode($update, true);

$callback_query_id = $update_array["callback_query"]["id"];
file_get_contents($baseurl."/answerCallbackQuery?callback_query_id=".$callback_query_id."&url=".$game_url);


$from_chat = $update_array["message"]["chat"]["id"];
$text = $update_array["message"]["text"];

switch ($text) {
    
    case "/help@".$bot_name:
    case "/help":
        file_get_contents($baseurl."/sendmessage?chat_id=".$from_chat."&text=Click this link to share a game in a chat: https://telegram.me/".$bot_name."?game=".$game_name);
        break;

    default:
        if($update_array["message"]["chat"]["type"]=="private"){
            file_get_contents($baseurl."/sendmessage?chat_id=".$from_chat."&text='".$text."' is not recognized as a command. See /help for the list of available commands.");
        }
};
?>
