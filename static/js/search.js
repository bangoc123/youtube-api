//Append link

function append_link(template, data) {
	// initiate the result to the basic template
	res = template;
	// for each data key, replace the content of the brackets with the data
	for(var i = 0; i < data.length; i++) {
		res = res.replace(/\[(.*?)\]/g, function(match, j) { // some magic regex
			return data[i][j];
		})
	}
	return res;
}

// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {

    //var responseString = JSON.stringify(response, '', 2);
    //document.getElementById('response').innerHTML += responseString;
    //console.log(response);
    var results = response.items;
    console.log(results.length);
    $.each(results,function(index,item){
        console.log(item);
        //$('#response').text(item.id.videoId);
        $.get("http://localhost:8000/item/",function(data){
            var link_youtube = append_link(data,[{"videoid":item.id.videoId, "title":item.snippet.title}]);
            console.log(link_youtube);
            $("#response").append(link_youtube);
        });
    });

}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See https://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyCXP3fXu3rO6EYhN1wJMTbP8cQlaAc4IUw');

    search();
}

function search() {
    // Use the JavaScript client library to create a search.list() API call.
    $("form").on("submit",function(e){
        e.preventDefault();
        $('#response').empty();
        var request = gapi.client.youtube.search.list({
        part: 'snippet',
        type: 'video',
        q: encodeURIComponent($("#search").val()).replace(/%20/g,"+"),
        maxResults:10,
        order: 'viewCount',
    });

        // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
        console.log(request);
        request.execute(onSearchResponse);

});

}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
}