<?php

function post_highscore($baseurl, $data) {

    $score = $data["score"];
    $curData = $data["curData"];    

    $legal_score = min($score, 5);

    $decoded_url = explode("//", urldecode($curData))[1];

    //TODO få tak i user_id
    $user_id = "123";

    $full_url = $baseurl."/setGameScore?user_id=".$user_id."&score=".$legal_score;    

    file_get_contents($full_url);
}

?>