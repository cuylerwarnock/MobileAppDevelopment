/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

window.onload = function () {
    document.addEventListener("deviceready", init, false);
    init();
}

function init() {

}

function getLocation() {
    var options = {
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true
    };

    navigator.geolocation.getCurrentPosition(success, failure, options);
}

function success(position) {
    var accuracy = position.coords.accuracy;
    var altitude = position.coords.altitude;
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var timestamp = position.timestamp;

    var output = "accuracy: " + accuracy + "<br/>";
    output += "altitude: " + altitude + "<br/>";
    output += "latitude: " + latitude + "<br/>";
    output += "longitude: " + longitude + "<br/>";
    output += "timestamp: " + timestamp + "<br/>";

    document.getElementById("result").innerHTML = output;

    var mapOptions = {
        center: {
            lat: latitude,
            lng: longitude
        },
        zoom: 18
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var marker = new google.maps.Marker({
        position: {
            lat: latitude,
            lng: longitude
        },
        map: map
    });
}

function failure(msg) {
    alert("Error: " + msg.message);
}

function clearScreen() {
    document.getElementById("map-canvas").innerHTML = "";
    document.getElementById("map-canvas").style.backgroundColor = "white";
    document.getElementById('result').innerHTML = "";
}