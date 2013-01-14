var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var util    = require('util');

var log = function(obj) { console.log(util.inspect(obj, false, 3, true)); }
var app = express();

var Shows = function(){
    var self = this;
    this.shows = [
        {name:'Game of Thrones', url: 'http://www.tv.com/shows/game-of-thrones/'},
        {name: 'The Big Bang Theory', url :'http://www.tv.com/shows/the-big-bang-theory/'},
        {name: 'Californication', url: 'http://www.tv.com/shows/californication/'},
        {name: 'Breaking Bad', url: 'http://www.tv.com/shows/breaking-bad/'},
        {name: 'True Blood', url: 'http://www.tv.com/shows/true-blood/'},
        {name: 'Dexter', url: 'http://www.tv.com/shows/dexter/'},
        {name: 'Falling Skies', url: 'http://www.tv.com/shows/falling-skies/'},
        {name: 'Homeland', url: 'http://www.tv.com/shows/homeland-2011/'},
        {name: 'Top Gear', url: 'http://www.tv.com/shows/top-gear/'},
        {name: 'House of lies', url: 'http://www.tv.com/shows/house-of-lies/'},
        {name: 'Cougar town', url: 'http://www.tv.com/shows/cougar-town/'},
        {name: 'South Park', url: 'http://www.tv.com/shows/south-park/'}
    ];
    
    this.load = function() {
        for (var i=0; i < self.shows.length; i++) {
            (function(i){
                request(self.shows[i].url, function(error, resp, body){
                    var $ = cheerio.load(body);
                    var x = i;
                    var img = $('div.image_box img').attr('src');
                    if(img)
                        self.shows[x].img = img;
                    
                    var date = $('.next_episode .highlight_date span').text().replace('AIRS ON', '').trim();
                    if(date)
                        self.shows[x].date = date;
                });
            })(i);
        };
    };
    
    this.all = function() {
        return shows;
    };
    
    this.load();
}

var shows = new Shows();

app.get('/', function(req, res){
    res.sendfile('index.html');
});

app.get('/shows', function(req, res){
    res.json(shows.all());
});

app.listen(8080);


setInterval(function(){ shows.load(); }, 1000 * 60 * 60 * 4)

