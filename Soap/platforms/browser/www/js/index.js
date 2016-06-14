window.onload = function () {
    document.addEventListener("deviceready", init, false);

    init();
}

function init() {
    document.getElementById('btnJoke').addEventListener('click', getJoke, false);
    document.getElementById('btnQuery').addEventListener('click', getNewJoke, false);
    document.getElementById('btnZip').addEventListener('click', getWeather, false);
    //document.getElementById('zip').addEventListener('click',getWeather,false);
}
// ------------Joke---------------- 
function getJoke() {
    $.ajax({
        type: "GET",
        url: 'http://api.icndb.com/jokes/random/',
        dataType: "text",
        success: function (result) {
            showJoke(result);
        }
    });
}

function showJoke(result) {
    var json = jQuery.parseJSON(result);
    document.getElementById('resultJoke').innerHTML = json.value.joke;
}

function getNewJoke() {
    var fName = document.getElementById('fname').value;
    var lName = document.getElementById('lname').value;
    $.ajax({
        type: "GET",
        url: "http://api.icndb.com/jokes/random?firstName=" + fName + "&lastName=" + lName,
        dataType: "text",
        success: function (result) {
            showJokeQuery(result)
        },
    })
}

function showJokeQuery(result) {
    var json = jQuery.parseJSON(result);
    document.getElementById('resultQuery').innerHTML = json.value.joke;
}

function getWeather() {
    var zip = document.getElementById('zip').value;
    $.ajax({
        type: "GET",
        url: "http://wsf.cdyne.com/WeatherWS/Weather.asmx/GetCityWeatherByZIP?Zip=" + zip,
        dataType: "xml",
        success: function (xml) {
            showWeather(xml);
        }
    });
}

function showWeather(xml) {
    var city = xml.getElementsByTagName('City')[0].firstChild.nodeValue;
    var temperature = xml.getElementsByTagName('Temperature')[0].firstChild.nodeValue;
    var description = xml.getElementsByTagName('Description')[0].firstChild.nodeValue;

    var output = "";
    output += "City: " + city + "<br />";
    output += "Temperature: " + temperature + "<br />";
    output += "Description: " + description + "<br />";

    document.getElementById("resultWeather").innerHTML = output;
}