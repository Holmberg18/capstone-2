



var MOCK_LEGO_BUILDS = {
	"legoBuilds": [
        {
            "id": "favorite_set_01",
            "text": "This is my biggest set yet!",
            "username": "holmberg18",
            "friendName": "John Doe",
            "publishedAt": 1470016976609
        },
        {
            "id": "favorite_set_02",
            "text": "Here's a set that my little brother made",
            "username": "holmberg18",
            "friendName": "John Doe",
            "publishedAt": 1470012976609
        },
        {
            "id": "favorite_set_03",
            "text": "A set I made when I was bored at work",
            "username": "holmberg18",
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
    
    
     var input = $('#input-field');
     
     
    
     input.on('keydown', function(event) {
    if (event.keyCode != 13) {
        return;
    }
   
    $.get('https://rebrickable.com/api/get_part?key=KdPMcvXXIi&format=json&part_id='+input.val(), function(data){
    console.log(data);
  })


     $.get('https://rebrickable.com/api/get_part_sets?key=KdPMcvXXIi&format=json&color_id=&setheader=0&part_id='+input.val(), function(data){
    console.log(data);
  })


});
  

	setTimeout(function(){ callbackFn(MOCK_LEGO_BUILDS)}, 1);
}

// this function stays the same when we connect
// to real API later
function displayLegoBuilds(data) {
    for (index in data.legoBuilds) {
	   //$('body').append(
    //     '<p>' + data.legoBuilds[index].text + '</p>');
    // }
    
    //  $('body').append(
    //      '<p>Here are my builds!<br><br>' + JSON.stringify(data.legoBuilds[index]) + '</p>');
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


function addPiece(piece){
    
    $.ajax({
             url:'/pieces',
             type:"POST",
             data: JSON.stringify({partId:piece.part_id, partName: piece.name}),
             contentType:"application/json; charset=utf-8",
             dataType:"json",
             success: function(data){
              console.log('piece has been added');
             }
        });
    
}
	$('.search-pieces').hide();
    $('.builds').hide();
    $('.login-create').hide();
$(document).ready(function(){



    jQuery('.login-link').submit(function(e){
        e.preventDefault();
        $('.login-create').show();
        $('.welcome').hide();
    });
    
    
	jQuery('.user-login').submit(function(e){
	    e.preventDefault();
	    
	    var userName = $('#log-in-username').val();
	    var passWord = $('#log-in-password').val();
	    
	    $.ajax({
             url:'/login',
             type:"POST",
             data: JSON.stringify({username: userName, password: passWord}),
             contentType:"application/json; charset=utf-8",
             dataType:"json",
             success: function(data){
               console.log('Success login: '+data);
               jQuery('.login-create').hide();
               $('.search-pieces').show();
                $('.builds').show();
                 jQuery('.creation-message').hide();
             }
        });
	});
	
	jQuery('.user-create').submit(function(e){
	    e.preventDefault();
	    
	    var newUsername = $('#create-username').val();
	    var newPassword = $('#create-password').val();
	    
	      $.ajax({
             url:'/users',
             type:"POST",
             data: JSON.stringify({username: newUsername, password: newPassword}),
             contentType:"application/json; charset=utf-8",
             dataType:"json",
             success: function(data){
               console.log('successful user registration: '+data);
                $('body').append('<p class="creation-message">User Account Created!</p>');
                $('#create-username').val('');
	             $('#create-password').val('');
             }
        });
	});


	
	jQuery('.piece-input').submit(function(e){
	    e.preventDefault();
	    var partId = $('#piece-number').val();
	       $.ajax({
             url:'https://rebrickable.com/api/get_part?key=KdPMcvXXIi&format=json&part_id='+partId,
             type:"GET",
             contentType:"application/json; charset=utf-8",
             dataType:"json",
             success: function(data){
                console.log(data);
               $('.piece-title').html(data.name);
               $('.piece-description').html(data.category);
               
               	jQuery('.add-piece').click(function(){
                    addPiece(data);
	            
            	});
               
             }
        });
	});
	

	
	
});//end document.ready
	    
	   // jQuery.post('/login', {username: userName, password: passWord}, function(err,data){
	        
	        
	    
	   // console.log(err);
	   // console.log(data);
	    
	   //    //data: JSON.stringify({
    //     //   username: data.username,
    //     //   password: data.password
    //     // })
	    
	   //	},"json");
	    
	