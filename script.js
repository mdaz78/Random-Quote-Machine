var newQuoteBtn = document.getElementById("button2");
var tweet = document.getElementById("button1");
var quote; // holds the quote recieved from the api call
var author; // holds the name of the author recieved from the api call

function getNewQuote() {

    var xmlHTTP = new XMLHttpRequest();
    var url = "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en";

    xmlHTTP.open('GET', url, true);
    xmlHTTP.send();

    xmlHTTP.onload = function() {
        if (xmlHTTP.status === 200) {
            var recieved = xmlHTTP.response;
            recieved = JSON.parse(recieved);

            quote = recieved.quoteText;
            author = recieved.quoteAuthor;

            // set the value of the quote along with formatting
            var quoteString = '<i class="fa fa-quote-left"></i> ' + quote + ' <i class="fa fa-quote-right"></i>';

            // display the element
            document.getElementById("a-quote").innerHTML = quoteString;

            // set the value of author to quoteAuthor if an empty value is not recieved
            // and display the author name
            author ? document.getElementById("author-id").innerHTML = " - " + author : document.getElementById("author-id").innerHTML = " - unknown";



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

newQuoteBtn.addEventListener("click", function() {
    getNewQuote();
    randomColor();
});

tweet.addEventListener("click", function() {
    window.open('http://twitter.com/intent/tweet?text='+ encodeURIComponent(quote + ' - ' + author));
});
