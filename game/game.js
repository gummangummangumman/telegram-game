const API_BASE_URL = window.location.toString().substring(0, window.location.toString().indexOf("game/"));
const API_ENDPOINT_POST_HIGHSCORE = API_BASE_URL + "highscore";
const curData = (location.hash || '').substring(1).replace(/[\?&].*/g, '');
let counter = 0;

function plus() {
    if (counter < 5) {
        counter++;
    }
    document.getElementById("counter").innerHTML = counter;
}

function minus() {
    if (counter > 0) {
        counter--;
    }
    document.getElementById("counter").innerHTML = counter;
}


function finish() {
    document.getElementById("game").setAttribute("style", "display: none;");
    document.getElementById("game_over").setAttribute("style", "");
    document.getElementById("game_over_counter").innerHTML = counter;

    send_score();
}

function play_again() {
    counter = 0;
    document.getElementById("counter").innerHTML = counter;
    document.getElementById("game").setAttribute("style", "");
    document.getElementById("game_over").setAttribute("style", "display: none;");
}

function get_scores() {
    get(`${API_ENDPOINT_POST_HIGHSCORE}?chat=${TelegramGameProxy.initParams.chat}&user=${TelegramGameProxy.initParams.user}\
            &message=${TelegramGameProxy.initParams.message}&inline=${TelegramGameProxy.initParams.inline}`);
}

function send_score() {
    post(API_ENDPOINT_POST_HIGHSCORE, {
        score: counter,
        chat: TelegramGameProxy.initParams.chat,
        user: TelegramGameProxy.initParams.user,
        message: TelegramGameProxy.initParams.message,
        inline: TelegramGameProxy.initParams.inline,
        instance: TelegramGameProxy.initParams.instance,
    });
}

function post(url, data) {
    var xhr = new XMLHttpRequest();
    console.log(`posting score to url ${url}`, data);
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log("posted score successfully");
        } else {
            try {
                console.error("posting score seemed to fail", JSON.parse(xhr.responseText));
            } catch (error) {
                console.error("posting score seemed to fail", xhr.responseText);
            }
        }
    }
    xhr.open("POST", url, true);
    xhr.send(JSON.stringify(data));
}

function get(url) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log("fetched scores successfully", xhr.responseText);
        } else {
            try {
                console.error("fetching highscores seemed to fail", JSON.parse(xhr.responseText));
            } catch (error) {
                console.error("fetching highscores seemed to fail", xhr.responseText);
            }
        }
    }
    xhr.open("GET", url);
    xhr.send();
}
