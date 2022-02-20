<?php

$env_file = file_get_contents(".env");

//env file only contains the telegram bot token
$bottoken = $env_file;

$baseurl = "https://api.telegram.org/bot".$bottoken;
$update = file_get_contents("php://input");
$update_array = json_decode($update, true);

$from_id = $update_array["message"]["from"]["id"];

$from_chat = $update_array["message"]["chat"]["id"];

$text = $update_array["message"]["text"];



$game_url="https://gumman.one/games/telegram/frontend/game";

$callback_query_id = $update_array["callback_query"]["id"];
file_get_contents($baseurl."/answerCallbackQuery?callback_query_id=".$callback_query_id."&url=".$game_url);



switch ($text) {
    
    case "/help@gummangamebot":
    case "/help":
        file_get_contents($baseurl."/sendmessage?chat_id=".$from_chat."&text=Click this link: https://telegram.me/gummangamebot?game=firstgame");
        break;

    default:
        if($update_array["message"]["chat"]["type"]=="private"){
            file_get_contents($baseurl."/sendmessage?chat_id=".$from_chat."&text='".$text."' is not recognized as a command. See /help for the list of available commands.");
        }
};
?>
