var audioFile;
var storyImg;
var intv;

window.onload = function () {
    document.addEventListener("deviceready", init, false);
    init();
}

function init() {
    var btnPlay = document.getElementById("btnPlay");
    var btnPause = document.getElementById("btnPause");
    var btnStop = document.getElementById("btnStop");

    btnPlay.addEventListener("click", playAudio, false);
    btnPlay.addEventListener("click", startTimer, false);
    btnPause.addEventListener("click", pauseAudio, false);
    btnPause.addEventListener("click", stopTimer, false);
    btnStop.addEventListener("click", stopAudio, false);

    //audioFile = document.getElementById("audioFile");
    var src = cordova.file.applicationDirectory + "www/assets/threepigs.mp3";
    audioFIle = new Media(src);
    storyImg = document.getElementById("storyImg");
}

function playAudio() {
    audioFile.play();
}

function pauseAudio() {
    audioFile.pause();
}

function stopAudio() {
    //pauseAudio();
    //audioFile.currentTime = 0;
    audioFile.stop();
}

function changeStory(story) {
    //audioFile.src = "assets/" + story + ".mp3";
    var src = cordova.file.applicationDirectory + "www/assets/" + story + ".mp3";
    audioFile = new Media(src);

    storyImg.src = "img/" + story + ".jpeg";
}

function startTimer() {
    intv = setInterval(updateTime, 1000);
}

function stopTimer() {
    clearInterval(int);
    updateTime();
}

function updateTime() {
    document.getElementById("timeOut").innerHTML = "Elapsed Time: " + secsToMin(audioFile.currentTime);
}

function secsToMin(seconds) {
    var minutes = Math.floor(seconds / 60);
    var theSeconds = seconds - minutes * 60;
    if (theSeconds > 9)
        return minutes + ":" + Math.round(theSeconds);
    else
        return minutes + ":0" + Math.round(theSeconds);
}