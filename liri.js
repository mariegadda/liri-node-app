// userRequest variable is what the user types into terminal to trigger the liri bot. 
var userRequest = process.argv[2];

// variable for the song or movie title 
var title = process.argv[3];
//getting the data from keys.js
var twitKeys = require('./keys.js');

//using twitter module
var Twitter = require('twitter');

//making the client and pararms variable for twitter request
var client = new Twitter(twitKeys.twitterKeys);

var params = {screen_name: 'CodePractice'};


// request for twitter function
 if (userRequest === "my-tweets") {
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
 	 if (!error) {
  		for (var i = 0; i < tweets.length; i++) {
  			console.log(tweets[i].text);
  			console.log("Tweeted at:" + tweets[i].created_at);
  		} 
	}else {
  		console.log("Sorry! There was an error");
  		}
	});
  }


var spotify = require('spotify');
// request for spotify function
if (userRequest === "spotify-this-song" && typeof title !== 'undefined') {
    spotify.search({
        type: 'track',
        query: title
    }, function(err, data) {
        if (!err) {

         	
     // logs the artists (works for multiple artists for one song, first 3 songs)
           var artistArr = [];
           var bigArtistArr =[];

			for (var i=0; i < data.tracks.items[0].artists.length; i++) {
    		artistArr.push(data.tracks.items[0].artists[i].name);
				}
			artistArr.join(', ');

				var artistArr1 = [];
			for (var i=0; i < data.tracks.items[1].artists.length; i++) {
    		artistArr1.push(data.tracks.items[1].artists[i].name);
				}
			artistArr1.join(', ');

					var artistArr2 = [];
			for (var i=0; i < data.tracks.items[2].artists.length; i++) {
    		artistArr2.push(data.tracks.items[2].artists[i].name);
				}
			artistArr2.join(', ');

		// an array of the artist name arrays (in case the song has mutliple artists)
			bigArtistArr.push(artistArr, artistArr1, artistArr2);

 		// logs the artist name, title, line break, then the spotify url for that song

           
            for (var i = 0; i < bigArtistArr.length; i++) {
            	console.log(bigArtistArr[i] + ", " + data.tracks.items[i].album.name + '\n' + data.tracks.items[i].external_urls.spotify);
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
// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// if no song is provided then your program will default to
// "The Sign" by Ace of Base
// node liri.js movie-this '<movie name here>'
// This will output the following information to your terminal/bash window:
//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.
//    * Rotten Tomatoes URL.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
// It's on Netflix!
// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.