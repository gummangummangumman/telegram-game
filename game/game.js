function loopColour()
{
    const body = document.body;

    body.style.color = Math.random() > 0.5 ? "red" : "blue";

    setTimeout(function() {loopColour(); }, 500);
}

window.onload = loopColour