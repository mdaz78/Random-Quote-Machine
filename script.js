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
                    $(".author").text("- " + author);
                } else {
                    $(".author").text("- " + unknown);
                }
            }
        });
    }
    getNewQuote(); // invoke the function for the first time

    $(".new-quote").on("click", function(event) {
        event.preventDefault(); // stops from moving the screen after clicking the button
        getNewQuote();
    });

});
