$(document).ready(function() {
    var quote; // holds the quote recieved from the api call
    var author; // holds the name of the author recieved from the api call

    function getNewQuote() {
        $.ajax({
            url: 'http://api.forismatic.com/api/1.0/',
            jsonp: 'jsonp',
            dataType: 'jsonp',
            data: {
                method: 'getQuote',
                format: 'jsonp',
                lang: 'en'
            },
            success: function(response) {
                quote = response.quoteText;
                author = response.quoteAuthor;

                $(".quote").html('<i class="fa fa-quote-left"></i> ' + quote);

                if(author) {
                    $(".authors").text("- " + author);
                } else {
                    $(".authors").text("- " + unknown);
                }
            }
        });
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
