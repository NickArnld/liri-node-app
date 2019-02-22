require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const moment = require('moment');
const fs = require('fs');
var spotify = require('spotify');

var command = process.argv[2];

if(command === "do-what-it-says"){
    doWhatTheySay();
} else{
    if(command === "concert-this"){
        eventCall(inputGather());
    } else if(command === "spotify-this-song"){
        spotifyCall(inputGather())
    } else if(command === "movie-this"){ 
        movieCall(inputGather())     
    }
}

function eventCall(input){
    var parseInput = input;
    var url = `https://rest.bandsintown.com/artists/${parseInput}/events?app_id=codingbootcamp`;

    axios.get(url)
    .then((res)=>{
        var venueObj = res.data[0].venue;
        var vName = venueObj.name;
        var vCity = venueObj.city;
        var vRegion = venueObj.region;
        var rawDate = res.data[0].datetime;
        var date = moment(rawDate).format("MM/DD/YYYY");

        console.log("Band Info:");
        console.log("Venue:", vName);
        console.log("City:", vCity, ",", vRegion);
        console.log(date);
    }).catch((err)=>{
        console.log(err);
    })
}

function spotifyCall(input){
    var parseInput = input;
    var url = `https://api.spotify.com/v1/search/q=${parseInput}&type=track`;

    
// * `spotify-this-song` <song-name>
//  Artist(s), The song's name, A preview link of the song from Spotify, The album that the song is from, 
//  If no song is provided then your program will default to "The Sign" by Ace of Base.
}

function movieCall(input){
    var parsedInput = input;
    var url = `http://www.omdbapi.com/?apikey=trilogy&t=${input}`;

    axios.get(url)
    .then((res)=>{
        if(res.data.Title){
        console.log("Title:", res.data.Title);
        console.log("Year:", res.data.Year);
        console.log("IMDB Rating:", res.data.imdbRating);
        console.log("Rotten Tomatoes:", res.data.Ratings[1].Value);
        console.log("Country Produced:", res.data.Country);
        console.log("Language:", res.data.Language);
        console.log("Plot:", res.data.Plot);
        console.log("Actors:", res.data.Actors);
        } else{
            mrNobody();
        }
    }).catch((err)=>{
        console.log(err);
    })
}

function doWhatTheySay(){
    fs.readFile('random.txt',"utf-8", (err,res)=>{
        if(err){console.log(err)}
        var arr = res.split(",");
        var cmd = arr[0];
        var input = arr[1];

        if(cmd === "concert-this"){
            eventCall(input);
        } else if(cmd === "spotify-this-song"){
            spotifyCall(input)
        } else if(cmd === "movie-this"){ 
            movieCall(input)     
        }


    })
}

function inputGather(){
    var query = "";    
    for(x=3;x<process.argv.length;x++){
        var cur = process.argv[x];
        query+=cur;
        if(command === "movie-this"){
            query+=" ";
        }
    }
    return query  
}

function mrNobody(){
    var url = `http://www.omdbapi.com/?apikey=trilogy&t=Mr_Nobody`;

    axios.get(url)
    .then((res)=>{
        console.log("Title:", res.data.Title);
        console.log("Year:", res.data.Year);
        console.log("IMDB Rating:", res.data.imdbRating);
        console.log("Rotten Tomatoes:", res.data.Ratings[1].Value);
        console.log("Country Produced:", res.data.Country);
        console.log("Language:", res.data.Language);
        console.log("Plot:", res.data.Plot);
        console.log("Actors:", res.data.Actors);
        
    }).catch((err)=>{
        console.log(err);
    })
}
