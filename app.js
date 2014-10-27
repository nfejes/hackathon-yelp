var express = require('express');
var mongoskin = require('mongoskin');

var username = 'nik' // TODO
var password = 'Dummy12345' // TODO
var url = 'ds047940.mongolab.com' // TODO
var db = mongoskin.db('mongodb://'+username+':'+password+'@'+url+':47940/hackathon-yelp', {safe:true})
var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
})

app.get('/q0/:format', function(req, res){
    var question = "What restaurants in Middleton are good for kids?";
    var query = {"city":"Middleton", "attributes" : {"Good for Kids" : true}};
    var projection = {};
    db.collection('business').find(query, projection).toArray(function(e, items){
		if (e) console.log(e);
        if (req.params['format'] == 'json'){
            res.status(200).send(items);
        }else if (req.params['format'] == 'html'){
            var answer = items.map(function(d){
                return d['name'];
            }).join(" and ");
            res.status(200).render('answer', {question: question, answer: answer});
        }else if (req.params['format'] == 'd3'){
            res.status(200).render('business', {data: items});
        }
    });
});


app.get('/q1/:format', function(req, res){
    var question = 'What is the top-rated business for a price range of "2"?';
    var query =  { stars: {$gt: 4} , "attributes.Price Range":2};
    var projection = {};    // TODO
    var collection = 'business';     // TODO
    db.collection(collection)  
        .find(query, projection).sort({'stars':-1})
        .limit(10)  // TODO
        .toArray(function(e, items){
        if (req.params['format'] == 'json'){
            res.status(200).send(items);
        }else if (req.params['format'] == 'html'){
            var answer = items.map(function(d){
                return d['name'];   // TODO
            }).join(" and ");   // TODO
            res.status(200).render('answer', {question: question, answer: answer});
        }
    });
});

app.get('/q2/:format', function(req, res){
    var question = "Question?"; // TODO
    var query = {}; // TODO
    var projection = {};    // TODO
    var collection = 'business';     // TODO
    db.collection(collection)  
        .find(query, projection)
        .limit(10)  // TODO
        .toArray(function(e, items){
        if (req.params['format'] == 'json'){
            res.status(200).send(items);
        }else if (req.params['format'] == 'html'){
            var answer = items.map(function(d){
                return d['name'];   // TODO
            }).join(" and ");   // TODO
            res.status(200).render('answer', {question: question, answer: answer});
        }
    });
});


app.get('/d3/:format', function(req, res){
    var question = "Question?"; // TODO
    var query = {}; // TODO
    var projection = {};    // TODO
    var collection = 'business';     // TODO
    console.log(req.params);
    db.collection(collection)  
        .find(query, projection)
        .limit(10)  // TODO
        .toArray(function(e, items){
        if (req.params['format'] == 'json'){
            res.status(200).send(items);
        }else if (req.params['format'] == 'd3'){
            res.status(200).render('custom', {data: items});
        }
    });
});

app.listen(3000);
console.log('app is listening at localhost:3000');
