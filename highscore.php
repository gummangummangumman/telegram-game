<?php

require "dotenv.php";

(new DotEnv(__DIR__ . '/.env'))->load();

$bot_token = getenv("BOT_TOKEN");
$bot_name = getenv("BOT_NAME");
$game_name = getenv("GAME_NAME");
$game_url = getenv("GAME_URL");

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

$response = new stdClass();
$url = post_highscore($baseurl, $update_array);

$response->message = "Hello.";
$response->url = $url;
echo json_encode($response);

function post_highscore($baseurl, $data)
{

    $score = $data["score"];
    $curData = $data["curData"];

    $legal_score = min($score, 5);

    $decoded_url = explode("//", urldecode($curData))[1];

    //TODO få tak i user_id
    $user_id = "123";

    $full_url = $baseurl . "/setGameScore?user_id=" . $user_id . "&score=" . $legal_score;

    $file = file_get_contents($full_url);
    return urldecode($curData);
}

?>