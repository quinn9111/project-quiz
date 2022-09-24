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


var displayFact = function (randomFact) {
    var factLi = $("<li>")
        .addClass("");
    var factP = $("<p>")
        .addClass("m-1")
        .text(randomFact);
    factLi.append(factP);

    $("#randomFact").append(factLi);


};