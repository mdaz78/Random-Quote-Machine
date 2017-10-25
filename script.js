$(document).ready(function() {
    var quote; // holds the quote recieved from the api call
    var author; // holds the name of the author recieved from the api call

    function getNewQuote() {

        var xmlHTTP = new XMLHttpRequest();
        var url = "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en";

        xmlHTTP.open('POST', url, true);
        xmlHTTP.send();

        xmlHTTP.onload = function() {
            if (xmlHTTP.status === 200) {
                var recieved = xmlHTTP.response;
                recieved = JSON.parse(recieved);
                quote = recieved.quoteText;
                author = recieved.quoteAuthor;

                $(".quote").html('<i class="fa fa-quote-left"></i> ' + quote);
                if(author) {
                    $(".authors").text("- " + author);
                } else {
                    $(".authors").text("- " + "unknown");
                }

            } else {
                console.log(xmlHTTP.status);
            }
        };
    }

    getNewQuote(); // invoke the function for the first time

    function randomColor() {
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        var bgColor = "rgb(" + x + "," + y + "," + z + ")";
        document.body.style.background = bgColor;
        document.getElementById("button1").style.background = bgColor;
        document.getElementById("button2").style.background = bgColor;
        document.getElementById("quote-id").style.color = bgColor;
        document.getElementById("author-id").style.color = bgColor;
    }

    $(".new-quote").on("click", function(event) {
        event.preventDefault(); // stops from moving the screen after clicking the button
        getNewQuote();
        randomColor();
    });

    $(".tweet-quote").on("click", function(event) {
        event.preventDefault();
        window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote + ' - ' + author));
    });

});
