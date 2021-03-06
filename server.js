// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

const DELAY = 0;
const PROD_SERVER = "http://rs-gateway.transitsherpa.com";

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 1337;        // set our port
var axios = require('axios');
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});



router.get('/',function (req,res) {
   res.json({message:"Welcome to our api",
            endpoints:["option_chains?stock_name=[stock name]","look_up?name=[company name]"]});
});

router.get('/directions/get-directions',function (req,res) {
    var responce = require('./responces/get-directions.json');
    console.log(responce);
    setTimeout(()=>{res.json(responce)},DELAY);
});

router.get('/directions/places',function (req,res) {
    axios.get(PROD_SERVER + req.url)
                .then((response)=>{
                   console.log(response.data);
                   res.json(response.data);
                }).catch((error)=>{
                    console.log(error);
                    res.json(error);
                });
});

router.get('/directions/reverse-geocode',function (req,res) {
     axios.get(PROD_SERVER + req.url)
                .then((response)=>{
                   console.log(response.data);
                   res.json(response.data);
                }).catch((error)=>{
                    console.log(error);
                    res.json(error);
                });
});

router.get('/transit/schedule-info-today-next',function (req,res) {
    var responce = require('./responces/schedule-info-today-next.json');
    console.log(responce);
    setTimeout(()=>{res.json(responce)},DELAY);
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

