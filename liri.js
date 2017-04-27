//====================================GLOBAL VARIABLES=====================================
// userRequest what the user types into terminal to trigger the liri bot. 
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

var params = {
    screen_name: 'CodePractice'
};

function getTweets() {
    // request for twitter function

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log(tweets[i].text + '\n' + "Tweeted at:" + tweets[i].created_at + '\n' + '================================================');

            }
        } else {
            console.log("Sorry! There was an error");
        }
    });
}

// =============================SPOTIFY===============================================


var spotify = require('spotify');

function getSongs() {
    // request for spotify function, returns 3 songs because often the first song returned is not the one I was looking for!

    spotify.search({
        type: 'track',
        query: title
    }, function(err, data) {
        if (!err) {

            // creates artist arrays in case one song has multiple artists, adds artist arrays to one array
            var artistArr = [];
            var bigArtistArr = [];
            var music = data.tracks.items;

            for (var i = 0; i < music[0].artists.length; i++) {
                artistArr.push(music[0].artists[i].name);
            }
            artistArr.join(', ');

            var artistArr1 = [];
            for (var i = 0; i < music[1].artists.length; i++) {
                artistArr1.push(music[1].artists[i].name);
            }
            artistArr1.join(', ');

            var artistArr2 = [];
            for (var i = 0; i < music[2].artists.length; i++) {
                artistArr2.push(music[2].artists[i].name);
            }
            artistArr2.join(', ');

            // an array of the artists' name arrays (in case the song has mutliple artists)
            bigArtistArr.push(artistArr, artistArr1, artistArr2);

            // logs a line, artist name, title, album name, and the spotify url for that song
            for (var i = 0; i < bigArtistArr.length; i++) {
                console.log('==================================================== ' + '\n' + bigArtistArr[i] + ": " + music[i].name +
                 '\n' + music[i].album.name + '\n' + music[i].external_urls.spotify);
            }

        } else {
            console.log('Error occurred: ' + err);
            return;
        }

    });

}

// if no song requested gives the info for The Sign by Ace of Base
function getTheSign() {

    spotify.search({
        type: 'track',
        query: 'The Sign'
    }, function(err, data) {
        if (!err) {
            var music = data.tracks.items;
            console.log('==================================================== ' + '\n' + music[3].name + '\n' + music[3].artists[0].name + 
            	'\n' + music[3].external_urls.spotify + '\n' + music[3].album.name + '\n' + '==================================================== ');

        } else {
            console.log('Error occurred: ' + err);
            return;
        }

    });
}

//=======================================OMDB=========================================

// OMDB request function.
var omdb = require('omdb');
var request = require('request');

function getMovie() {


    request("http://www.omdbapi.com/?t=" + title + "&plot=short&tomatoes=true&r=json", function(error, response, body) {
        var movie = JSON.parse(body);
        console.log('==================================================== ' + '\n' + movie.Title + '\n' + "Released in: " + movie.Year + '\n' + 'IMDB Rating: ' + movie.imdbRating + '\n' +
            'Produced in: ' + movie.Country + '\n' + 'Langauge: ' + movie.Language + '\n' + 'Plot: ' + movie.Plot + '\n' +
            'Starring: ' + movie.Actors + '\n' + 'Rotten Tomatoes: ' + movie.tomatoURL + '\n' + '==================================================== ');
    });
}

function getMrNobody() {

    request("http://www.omdbapi.com/?t=" + 'mr nobody' + "&plot=short&tomatoes=true&r=json", function(error, response, body) {
        var movie = JSON.parse(body);
        console.log('==================================================== ' + '\n' + movie.Title + '\n' + "Released in: " + movie.Year + '\n' + 'IMDB Rating: ' + movie.imdbRating + '\n' +
            'Produced in: ' + movie.Country + '\n' + 'Langauge: ' + movie.Language + '\n' + 'Plot: ' + movie.Plot + '\n' +
            'Starring: ' + movie.Actors + '\n' + 'Rotten Tomatoes: ' + movie.tomatoURL + '\n' + '==================================================== ');
    });
}
//===================================DO WHAT IT SAYS ========================================================

// function that grabs the text from random.txt and runs the spotify function with it. 
var fs = require('node-fs');

function doIt() {

    fs.readFile("random.txt", "utf8", function(error, text) {
        title = text;
        var textArr = text.split(",");
        userRequest = textArr[0];
        title = textArr[1];
        getSongs();

    });
}


//======================================RUN THE FUNCTIONS======================================================

// running the functions based on what the userRequest is!

if (userRequest === 'do-what-it-says') {
    doIt();
}

if (userRequest === "my-tweets") {
    getTweets();
}

if (userRequest === "spotify-this-song" && typeof title !== 'undefined') {
    getSongs();
}

if (userRequest === "spotify-this-song" && typeof title == 'undefined') {
    getTheSign();
}
if (userRequest === 'movie-this' && typeof title !== 'undefined') {
    getMovie();
}
if (userRequest === 'movie-this' && typeof title == 'undefined') {
    getMrNobody();
}



