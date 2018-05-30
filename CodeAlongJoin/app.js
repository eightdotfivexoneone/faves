var express = require('express');
var mysql = require("mysql");
var bodyParser = require('body-parser');
var app = express();

// Config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


const port = process.env.PORT || 8080;


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "qwertyroot71",
  database: "animals_db"
});



app.get("/", (req, results) => {
  var q = "SELECT COUNT(*) AS count FROM favorite_songs";
  connection.query(q, function(err, res) {
    if (err) throw err;
    // console.log(res[0]);
    var count = res[0].count;
    // results.send('<h1>You have ' + count +  ' favorite songs.</h1>');
    // connection.end();
    results.render('home', {data: count});  
  });
});

app.get("/joke", (req, results) => {
  var joke = "how can you tell when..."
  results.send(joke);
//   var q = "SELECT COUNT(*) AS count FROM favorite_songs";
//   connection.query(q, function(err, res) {
//     if (err) throw err;
//     // console.log(res[0]);
//     var count = res[0].count;
//     // results.send('<h1>You have ' + count +  ' favorite songs.</h1>');
//     // connection.end();
//     results.render('home', {data: count});  
//   });
});

app.post("/register", (request, results) => {
var track = {
  song: request.body.song,
  artis: request.body.artis,
  score: request.body.score,
  genre: request.body.genre
};
  console.log(JSON.stringify(request.body));
  // var s = {email: req.body.email};
  // console.log("Post Request Sent to Register", req.body);
  // var qinsert = "INSERT INTO favorite_songs (song, artis, score, genre) VALUES("+ track.title +", "+ track.artist +", " + track.sc + "," + track.g + ")";
  
  var sql = `INSERT INTO favorite_songs SET ?`;
  let query = connection.query(sql, track, (err, result) => {
    if(err){
      throw err;
    }
    console.log(result);
  })
  // 
  results.render('test', {data:5, 
                          song: request.body.song,
                          artis: request.body.artis,
                          score: request.body.score,
                          genre: request.body.genre } )
});
/*
router.get('/data', function(req, res){
  var obj = {};

    connection.query('SELECT * FROM favorite_songs', function(err, result) {

        if(err){
            throw err;
        } else {
            obj = {print: result};
            res.render('print', obj);                
        }
    });

});
*/
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
