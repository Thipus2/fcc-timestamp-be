// index.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/",
  function(req,res,next){
    var formatedDate=new Date();
    console.log(formatedDate);
    if (formatedDate!="Invalid Date"){
      res.send({"unix" : moment(formatedDate).unix()*1000,
                "utc" : formatedDate.toUTCString()})
      } else{
        res.send({error : "Invalid Date" });
      }
  });

app.get("/api/:text",
  function(req,res){
  if(moment(req.params.text).isValid()){
    var formatedDate=new Date(req.params.text);
    if (formatedDate!="Invalid Date"){
    res.send({"unix" : moment(formatedDate).unix()*1000,
              "utc" : formatedDate.toUTCString()})
    } else{
      res.send({error : "Invalid Date" });
    }
  }
  else{
    var formatedDate=new Date((parseInt(req.params.text)));
    if (formatedDate!="Invalid Date"){
    res.send({"unix" : moment(formatedDate).unix()*1000,
      "utc" : formatedDate.toUTCString()})
    } else{
      res.send({error : "Invalid Date" });
    }
  }
  
})

