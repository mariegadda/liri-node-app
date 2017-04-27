// userRequest variable is what the user types into terminal to trigger the liri bot. 
var userRequest = process.argv[2];
// variable for the song or movie title 
var title = process.argv[3];

//===================================TWITTER==========================================

//getting the data from keys.js
var twitKeys = require('./keys.js');

//using twitter module
var Twitter = require('twitter');

//making the client and params variable for twitter request
var client = new Twitter(twitKeys.twitterKeys);

var params = {screen_name: 'CodePractice'};

// request for twitter function
 if (userRequest === "my-tweets") {
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
 	 if (!error) {
  		for (var i = 0; i < 20; i++) {
  			console.log(tweets[i].text);
  			console.log("Tweeted at:" + tweets[i].created_at);
  		} 
	}else {
  		console.log("Sorry! There was an error");
  		}
	});
  }

// =============================SPOTIFY===============================================


var spotify = require('spotify');


// request for spotify function
if (userRequest === "spotify-this-song" && typeof title !== 'undefined') {
    spotify.search({
        type: 'track',
        query: title
    }, function(err, data) {
        if (!err) {

     // creates artist arrays in case one song has multiple artists, adds artist arrays to one array
           var artistArr = [];
           var bigArtistArr =[];
			var music = data.tracks.items;

			for (var i=0; i < music[0].artists.length; i++) {
    			artistArr.push(music[0].artists[i].name);
				}
				artistArr.join(', ');

				var artistArr1 = [];
			for (var i=0; i < music[1].artists.length; i++) {
    			artistArr1.push(music[1].artists[i].name);
				}
				artistArr1.join(', ');

					var artistArr2 = [];
			for (var i=0; i < music[2].artists.length; i++) {
    			artistArr2.push(music[2].artists[i].name);
				}
				artistArr2.join(', ');

		// an array of the artist name arrays (in case the song has mutliple artists)
			bigArtistArr.push(artistArr, artistArr1, artistArr2);

 		// logs the artist name, title, line break, then the spotify url for that song
            for (var i = 0; i < bigArtistArr.length; i++) {
            	console.log(' * ' + bigArtistArr[i] + ": "+ music[i].name + '\n' +  music[i].album.name + '\n' + music[i].external_urls.spotify);
            }

        } else {
            console.log('Error occurred: ' + err);
            return;
        }

    });
}
// if no song requested gives the info for The Sign by Ace of Base
if (userRequest === "spotify-this-song" && typeof title == 'undefined') {
	spotify.search({
        type: 'track',
        query: 'The Sign'
    }, function(err, data) {
        if (!err) {

        	console.log(data.tracks.items[3].name);
			console.log(data.tracks.items[3].artists[0].name);   			
            console.log(data.tracks.items[3].external_urls);
            console.log(data.tracks.items[3].album.name);

        } else {
            console.log('Error occurred: ' + err);
            return;
        }

    });
}

//=======================================OMDB=========================================


var omdb = require('omdb');
var request = require('request');

if (userRequest === 'movie-this' && typeof title !== 'undefined') {
	request("http://www.omdbapi.com/?t=" + title + "&plot=short&tomatoes=true&r=json", function(error, response, body){
		var movie = JSON.parse(body);
		console.log(movie.Title + '\n' + "Released in: " + movie.Year + '\n'+ 'IMDB Rating: ' + movie.imdbRating + '\n' +
			'Produced in: ' + movie.Country + '\n' + 'Langauge: ' + movie.Language + '\n' + 'Plot: ' + movie.Plot + '\n' +
			'Starring: '+ movie.Actors + '\n' + 'Rotten Tomatoes: ' + movie.tomatoURL);
	});

}if (userRequest === 'movie-this' && typeof title == 'undefined') {
	request("http://www.omdbapi.com/?t=" + 'mr nobody' + "&plot=short&tomatoes=true&r=json", function(error, response, body){
		var movie = JSON.parse(body);
		console.log(movie.Title + '\n' + "Released in: " + movie.Year + '\n'+ 'IMDB Rating: ' + movie.imdbRating + '\n' +
			'Produced in: ' + movie.Country + '\n' + 'Langauge: ' + movie.Language + '\n' + 'Plot: ' + movie.Plot + '\n' +
			'Starring: '+ movie.Actors + '\n' + 'Rotten Tomatoes: ' + movie.tomatoURL);
});
}

//===================================DO WHAT IT SAYS ========================================================
	
	


// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.




