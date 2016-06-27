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
    showOptions();

    var keys = localStorage.getItem("keys");
    if (keys == null) {
        var temp = [];
        localStorage.setItem("keys", JSON.stringify(temp));
    }
}

function testIt() {
    var fruits = ["Banana", "Orange", "Apple", "Mango"];
    var str = JSON.stringify(fruits);
    localStorage.setItem("fruits", str);

    var str2 = localStorage.getItem("fruits");
    var fruits2 = JSON.parse(str2);
    fruits2.push("Grapes");
    fruits2.push("Kiwi");

    for (i = 0; i < fruits2.length; i++) {
        console.log("FRUIT" + i + ": " + fruits2[i]);
        localStorage.setItem(fruits2[i], (i + 1) * 10);
    }

    var pos = fruits2.indexOf("Apple");
    console.log("Position of Apple: " + pos);

    fruits2.splice(pos, 1);

    pos = fruits2.indexOf("Pear");
    console.log("Position of Pear: " + pos);

    str = JSON.stringify(fruits2);
    console.log("Updated Fruits: ", fruits2);

    localStorage.setItem("fruits", str);

    //    localStorage.setItem("building", "atkinson");
    //    localStorage.setItem("course", "CSCI 3950");
    //
    //    console.log("Building:" + localStorage.getItem("building"));
    //    console.log("Length:" + localStorage.length);
    //
    //    for (i = 0; i < localStorage.length; i++)
    //        console.log("Key:" + localStorage.key(i));
    //
    //    localStorage.removeItem("building");
    //    localStorage.clear();
}

function opStore() {
    showPage("pgStore");
}

function opGet() {
    showPage("pgGet");
}

function opShowAll() {
    showPage("pgShowAll");
    var str = "";

    var keys = JSON.parse(localStorage.getItem("keys"));
    for (i = 0; i < keys.length; i++) {
        var myItem = JSON.parse(localStorage.getItem(keys[i]));
        str += "UPC: " + myItem.upc + " Product: " + myItem.product + " Quantity: " + myItem.quantity + "</br>";
    }
    document.getElementById("result").innerHTML = str;
}

function showOptions() {
    showPage("pgOptions");
}

function showPage(pgShow) {
    //Makes pgGet visible -- and pgStore invisible
    var pages = document.getElementsByClassName("page");
    for (i = 0; i < pages.length; i++) {
        pg = pages[i];
        pg.classList.remove("show");
        pg.classList.add("hide");
    }
    document.getElementById(pgShow).classList.add("show");
    document.getElementById(pgShow).classList.remove("hide");

    //Clear all existing data
    document.getElementById("result").innerHTML = "";
    clearForm();
}

function item(upc, product, quantity) {
    this.upc = upc;
    this.product = product;
    this.quantity = quantity;
}

function btnStoreIt() {
    var upc = document.getElementById("upc");
    var product = document.getElementById("product");
    var quantity = document.getElementById("quantity");

    var key = upc.value;
    var myItem = new item(upc.value, product.value, quantity.value);
    var str = JSON.stringify(myItem);
    localStorage.setItem(key, str);
    addKey(key);
}

function btnGetIt() {
    var key = document.getElementById("upcGet");
    var str = localStorage.getItem(key.value);
    document.getElementById('result').innerHTML = str;

    var myItem = JSON.parse(str);
    console.log("prduct:" + myItem.product);
    console.log("quantity:" + myItem.quantity);
}

function btnRemoveIt() {
    var key = document.getElementById("upcGet");
    localStorage.removeItem(key.value);
}

//updates "keys" field
function addKey(keystr) {
    var keys = JSON.parse(localStorage.getItem("keys"));
    if (keys.indexOf(keystr) == -1) {
        keys.push(keystr);
        localStorage.setItem("keys", JSON.stringify(keys));
    }

}

function removeKey(keystr) {
    var keys = JSON.parse(localStorage.getItem("keys"));
    var pos = keys.indexOf(keystr);

    if (pos != -1) {
        keys.splice(pos, 1);
        localStorage.setItem("keys", JSON.stringify(keys));
    }
}

function clearForm() {
    var upc = document.getElementById("upc");
    var product = document.getElementById("product");
    var quantity = document.getElementById("quantity");
    var key = document.querySelector("#upcGet");

    upc.value = "";
    product.value = "";
    quantity.value = "";
    key.value = "";
}