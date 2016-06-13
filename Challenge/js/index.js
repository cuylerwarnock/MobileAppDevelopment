 var myData = {
     items: [
         {
             name: "Names",
             place: "Places",
             thing: "Things"
            },
         {
             name: "James",
             place: "Paris",
             thing: "Books"
            },
         {
             name: "Laura",
             place: "Mexico",
             thing: "Chairs"
            },
         {
             name: "Sam",
             place: "Italy",
             thing: "Paper"
            },
         {
             name: "Dylan",
             place: "USA",
             thing: "Cheese"
            }
		]
 };
 window.onload = function () {

     var tableBody = "<ul>";
     var row = "<li>";
     for (var field in myData.items[0]) {
         row += '<span class="cell' + myData.items[0][field] + '">' + myData.items[0][field] + '</span>';
     }
     row += "</li>";
     tableBody += row;

     for (var i = 1; i < myData.items.length; i++) {
         row = "<li>";
         for (var field in myData.items[0]) {
             row += '<span class="cell' + myData.items[0][field] + '">' + myData.items[i][field] + '</span>';
         }
         row += "</li>";
         tableBody += row;
     }
     tableBody += "</ul>";

     console.log(tableBody);
     document.getElementById("table").innerHTML = tableBody;



     var listBody = "<ul>";
     for (var i = 1; i < myData.items.length; i++) {
         row = "<li class='mainList'><ul>";
         for (var field in myData.items[0]) {
             row += "<li class = 'subList'>" + myData.items[0][field] + ':' + myData.items[i][field] + '</li>';
         }
         row += "</ul></li>";
         listBody += row;
     }

     listBody += "</ul>";

     document.getElementById("list").innerHTML = listBody;

     var listNamesBody = "<ul>";
     for (var i = 1; i < myData.items.length; i++) {
         listNamesBody += "<li><button id='btn" + myData.items[i].name + "' onclick = 'display(" + i + ");'> " + myData.items[i].name + " </button></li>";
     }

     document.getElementById("names").innerHTML = listNamesBody;

 }

 function display(index) {
     document.getElementById("names2").innerHTML = myData.items[index].name + " - " + myData.items[index].place + " - " + myData.items[index].thing;
 }