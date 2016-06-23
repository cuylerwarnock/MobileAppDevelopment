window.onload = function () {
    document.addEventListener("deviceready", init, false);

    init();

}

function init() {
    document.getElementById('btnJoke').addEventListener('click', getJoke, false);
    document.getElementById('btnQuery').addEventListener('click', getNewJoke, false);
    document.getElementById('btnZip').addEventListener('click', getWeather, false);
    getTrainData(); //document.getElementById('zip').addEventListener('click',getWeather,false);
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
    alert(0);
    var city = xml.getElementsByTagName('City')[0].firstChild.nodeValue;
    alert(1);
    var temperature = xml.getElementsByTagName('Temperature')[0].firstChild.nodeValue;
    var description = xml.getElementsByTagName('Description')[0].firstChild.nodeValue;

    var output = "";
    output += "City: " + city + "<br />";
    output += "Temperature: " + temperature + "<br />";
    output += "Description: " + description + "<br />";
    alert(2);
    document.getElementById("resultWeather").innerHTML = output;
}

function getTrainData() {
    $.ajax({
        type: "GET",
        url: "http://www3.septa.org/hackathon/Arrivals/90404/10",
        dataType: "text",
        success: function (result) {
            showTrainData(result);

        }
    });
}

function showTrainData(result) {
    var data = jQuery.parseJSON(result);
    var arr = data[Object.keys(data)];
    var northbound = arr[0].Northbound;
    var southbound = arr[1].Southbound;


    var output = "Northbound<div class='table'>";
    for (i = 0; i < northbound.length; i++) {
        output += "<span class='row'>";
        output += "<span class='cell train_id border'>" + northbound[i].train_id + "</span>";
        output += "<span class='cell depart_time border'>" + northbound[i].depart_time + "</span>";
        output += "<span class='cell destination border'>" + northbound[i].destination + "</span>";
        output += "</span>";
    }
    output += "</div>";
    output += "<br /><br />";

    output += "Southbound<div class='table'>";
    for (i = 0; i < southbound.length; i++) {
        output += "<span class='row'>";
        output += "<span class='cell train_id border'>" + southbound[i].train_id + "</span>";
        output += "<span class='cell depart_time border'>" + southbound[i].depart_time + "</span>";
        output += "<span class='cell destination border'>" + southbound[i].destination + "</span>";
        output += "</span>";
    }
    output += "</div>";



    document.getElementById("trainTables").innerHTML = output;
}