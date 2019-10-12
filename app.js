var express = require('express');
var bodyParser = require('body-parser');
var request = require('request-promise');
 
var app = express();

//const recommand = require('C:/Users/user/Recommandation_system/recommender')
app.set('view engine','ejs');
app.use(bodyParser.json());
//app.use(bodyParser.json({type: 'application/vnd.api+json' }));

var urlencodedParser = bodyParser.urlencoded({extended:false})
app.get('/',function(req,res){
	// res.send('Hello world this is Express');
	res.render('index');
});



////////
app.post('/predict', urlencodedParser,async function (req, res) {
    var data = { // this variable contains the data you want to send
        data1: req.body.message,
    }
    console.log(data)
 
    var options = {
        method: 'POST',
        uri: 'http://127.0.0.1:5000/postdata',
        body: data,
        json: true // Automatically stringifies the body to JSON
    };
    
    var returndata;
    var sendrequest = await request(options)
    .then(function (parsedBody) {
        console.log(parsedBody); // parsedBody contains the data sent back from the Flask server
        returndata = parsedBody; // do something with this data, here I'm assigning it to a variable.
    })
    .catch(function (err) {
        console.log(err);
    });
    var movie=returndata['Movie']
    console.log(movie)
    var similar=returndata['Similars']
    console.log(similar)
    res.render('result',{movie :returndata['Movie'],resultdata:returndata['Similars']})
    //res.send(returndata);
});



app.listen(4000,function(){
	console.log("Listening on localhost:4000");
});