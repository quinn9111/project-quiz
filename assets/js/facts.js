var limit = 1;
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/facts?limit=' + limit,
    headers: { 'X-Api-Key': '4HOJeJLspZDYSk1lag9NBQ==ppIbbftGUimwIf2P' },
    contentType: 'application/json',
    success: function (result) {
        console.log(result[0].fact);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});