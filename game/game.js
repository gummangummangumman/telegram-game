const API_BASE_URL = window.location.toString().substring(0, window.location.toString().indexOf("game/"));
const curData = (location.hash || '').substring(1).replace(/[\?&].*/g, '');
let counter = 0;

function plus() {
    if(counter < 5) {
        counter++;
    }
    document.getElementById("counter").innerHTML = counter;
}

function minus() {
    if(counter > 0) {
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

// kode under inspirert av Corsairs - https://tbot.xyz/corsairs/game.js?19
function send_score() {
    post(API_BASE_URL, {
        score: counter,
        curData: curData
    });
}

function post(url, data) {
    var xhr = new XMLHttpRequest();
    var body = []
    for(var i in data) {
      body.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
      console.log("pushing " + encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
    }
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log("epic fail");
      }
    }
    xhr.open("POST", url, true);
    xhr.send(body.join('&'));
  }
  