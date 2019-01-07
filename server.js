// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var Comment = require("./models/comment.js");
var Article = require("./models/article.js");
//routes
var htmlRouter = require("./controllers/html-routes.js");
var articleRouter = require("./controllers/article-routes.js");
// Scraping tools
var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routing
app.use("/", htmlRouter);
app.use("/", articleRouter);

app.use(express.static("public"));


var URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/news-scraper'; 
mongoose.connect(URI);
var db = mongoose.connection;

// Show mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

//success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Listen on port 3000
app.listen(port, function() {
  console.log("App running on port 3000!");
});