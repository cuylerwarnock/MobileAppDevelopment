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
var cameraOpts;

window.onload = function () {
    document.addEventListener("deviceready", init, false);
}

function init() {
    var btnCam = document.getElementById("btnCam");
    btnCam.style.display = "block";
    cameraOpts = {
        quality: 40,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        saveToPhotoAlbum: true
    };
}

function takePic() {
    navigator.camera.getPicture(cameraSuccess, cameraFail, cameraOpts);
}

function cameraSuccess(imageData) {
    var result = document.getElementById("resultImg");
    result.src = imageData;
}

function cameraFail(msg) {
    alert("Error: " + msg);
}