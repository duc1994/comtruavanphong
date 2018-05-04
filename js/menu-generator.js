$(function() {
    
    loadJSON(function(data) {
        var actual_JSON = JSON.parse(data);

        var currentAmountColumn = 0;
        var htmlString = "";
        var imageArray = ["cocktails.png","deserts.png","hot-drinks.png","ice-drinks.png", "smoothies.png","beer.png"];
        
        actual_JSON.forEach(day => {
            var randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];
    
            if(currentAmountColumn === 0)
            {
                htmlString += "<div class='row'>"
            }
            htmlString += "<div class='col-sm-3 col-md-3'>";
            htmlString += "<div class='menu-images'><img src='img/menu/" + randomImage + "'></div>";
            htmlString += "<div class='menu-titles'><h1>" + day.Day + " (" + day.Date + ")" + "</h1></div>"; 
            htmlString += "<div class='menu-items'><ul>"
            day.Menu.forEach(type => {
                htmlString += "<li class='menu-category__li'>" + type.Name +"</li>"
                type.Meal.forEach(meal => {
                    htmlString += "<li>"+ meal + "</li>"
                })
            });
            htmlString += "</ul></div>" //close menu-items
            htmlString += "</div>" //Close col-sm-3
    
            currentAmountColumn++;
    
            if(currentAmountColumn === 4)
            {
                currentAmountColumn = 0;
                htmlString += "</div>"; //Close row
            }
            
        })
        $("#menu-table").empty();
        $("#menu-table").append(htmlString); 
    });
})

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data/menu.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }