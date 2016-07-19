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

var multKeys = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];

window.onload = function () {
    document.addEventListener("deviceready", init, false);
    init();
}

function init() {

}

function encrypt(msgIn, addKeyIn, multKeyIn, spaceIn, cipherIn) {
    var msg = document.getElementById(msgIn).value;
    var addKey = parseInt(document.getElementById(addKeyIn).value);
    var multKey = parseInt(document.getElementById(multKeyIn).value);
    var space = document.getElementById(spaceIn).checked;
    var cipher = document.getElementById(cipherIn);

    msg = msg.toUpperCase();
    var newMsg = "";

    while (addKey < 0)
        addKey = addKey % 26 + 26;
    while (multKey < 0)
        multKey = multKey % 26 + 26;
    multKey = multKey % 26;
    var possibleMultKey = false;
    for (i = 0; i < multKeys.length; i++) {
        if (multKeys[i] == multKey)
            possibleMultKey = true;
    }

    if (!possibleMultKey) {
        document.getElementById(multKeyIn).classList.add("error");
        alert("Multiplicative Key must be relatively prime to 26")
        return;
    } else if (document.getElementById(multKeyIn).classList.contains("error")) {
        document.getElementById(multKeyIn).classList.remove("error");
    }


    for (i = 0; i < msg.length; i++) {
        var letter = msg.charCodeAt(i);
        if (letter >= 65 && letter <= 90) {
            letter -= 65;
            letter = (letter * multKey) % 26;
            letter = (letter + addKey) % 26;
            letter += 65;
            newMsg += String.fromCharCode(letter);
        } else if (space) {
            newMsg += msg[i];
        }
    }


    cipher.innerHTML = newMsg;
}

function decrypt(msgIn, addKeyIn, multKeyIn, cipherIn) {
    var msg = document.getElementById(msgIn).value;
    var addKey = parseInt(document.getElementById(addKeyIn).value);
    var multKey = parseInt(document.getElementById(multKeyIn).value);
    var cipher = document.getElementById(cipherIn);

    msg = msg.toUpperCase();
    var newMsg = "";

    while (multKey < 0)
        multKey = multKey % 26 + 26;

    var possibleMultKey = false;
    for (i = 0; i < multKeys.length; i++) {
        if (multKeys[i] == (multKey % 26))
            possibleMultKey = true;
    }

    if (!possibleMultKey) {
        document.getElementById(multKeyIn).classList.add("error");
        alert("Multiplicative Key must be relatively prime to 26")
        return;
    } else if (document.getElementById(multKeyIn).classList.contains("error")) {
        document.getElementById(multKeyIn).classList.remove("error");
    }

    addKey = 26 - addKey;
    while (addKey < 0)
        addKey = addKey % 26 + 26;
    for (i = 0; i < multKeys.length; i++) {
        if ((multKey * multKeys[i]) % 26 == 1) {
            multKey = multKeys[i];
            break;
        }
    }

    for (i = 0; i < msg.length; i++) {
        var letter = msg.charCodeAt(i);
        if (letter >= 65 && letter <= 90) {
            letter -= 65;
            letter = (letter + addKey) % 26;
            letter = (letter * multKey) % 26;
            letter += 65;
            newMsg += String.fromCharCode(letter);
        } else {
            newMsg += msg[i];
        }
    }
    cipher.innerHTML = newMsg;
}