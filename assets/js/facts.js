var apiCall = function () {
    // $("#randomFact").remove();
    // api call to get random fact 
    var limit = 1;
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/facts?limit=' + limit,
        headers: { 'X-Api-Key': '4HOJeJLspZDYSk1lag9NBQ==ppIbbftGUimwIf2P' },
        contentType: 'application/json',
        success: function (result) {
            console.log(result[0].fact);
            var randomFact = result[0].fact;
            displayFact(randomFact);

        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
};


// appends random fact to the footer
var displayFact = function (randomFact) {
    var factLi = $("<li>")
        .addClass("m-1")
        .attr("id", "newFact");
    var factP = $("<p>")
        .addClass("m-1")
        .text(randomFact);
    factLi.append(factP);
    $("#randomFact").append(factLi);

    // $("#randomFact").remove();


};

var removeLiTimer = function () {

    $("#newFact").remove();

    //removes appended Fact after 10 seconds
    // setTimeout(removeLiTimer, 10000);
};

apiCall();
setInterval(apiCall, 10000);
setInterval(removeLiTimer, 10000);
// use set interval for printing every 10 seconds