



var MOCK_LEGO_BUILDS = {
	"legoBuilds": [
        {
            "id": "favorite_set_01",
            "text": "This is my biggest set yet!",
            "friendId": "aaaaaa",
            "friendName": "John Doe",
            "publishedAt": 1470016976609
        },
        {
            "id": "favorite_set_02",
            "text": "Here's a set that my little brother made",
            "friendId": "aaaaaa",
            "friendName": "John Doe",
            "publishedAt": 1470012976609
        },
        {
            "id": "favorite_set_03",
            "text": "A set I made when I was bored at work",
            "friendId": "aaaaaa",
            "friendName": "John Doe",
            "publishedAt": 1470011976609
        }
    ]
};



//https://rebrickable.com/api/<function> API call


// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn
function getRecentLegoBuilds(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
    
    
    var partID = $('#input-field').val();
    
    $.get('https://rebrickable.com/api/get_part?key=KdPMcvXXIi&param_id='+partID, function(data){
    console.log(data);
  })


	setTimeout(function(){ callbackFn(MOCK_LEGO_BUILDS)}, 1);
}

// this function stays the same when we connect
// to real API later
function displayLegoBuilds(data) {
    for (index in data.legoBuilds) {
	   //$('body').append(
    //     '<p>' + data.legoBuilds[index].text + '</p>');
    // }
    
    $('body').append(
        '<p>' + data.legoBuilds[index].text + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayLegoBuilds() {
	getRecentLegoBuilds(displayLegoBuilds);
}

//  on page load do this
$(function() {
	getAndDisplayLegoBuilds();
})

$(document).ready(function(){
	
	jQuery.get('/pieces', function(res){
		
		console.log(res);
		
	});
		
});