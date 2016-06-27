var audioFile;
var storyImg

window.onload = function () {
    document.addEventListener("deviceready", init, false);
    init();
}

function init() {
    var btnPlay = document.getElementById("btnPlay");
    var btnPause = document.getElementById("btnPause");
    var btnStop = document.getElementById("btnStop");

    btnPlay.addEventListener("click", playAudio, false);
    btnPause.addEventListener("click", pauseAudio, false);
    btnStop.addEventListener("click", stopAudio, false);

    audioFile = document.getElementById("audioFile");
    storyImg = document.getElementById("storyImg");
}

function playAudio() {
    audioFile.play();
}

function pauseAudio() {
    audioFile.pause();
}

function stopAudio() {
    pauseAudio();
    audioFile.currentTime = 0;
}

function changeStory(story) {
    audioFile.src = "assets/" + story + ".mp3";
    storyImg.src = "img/" + story + ".jpeg";
}