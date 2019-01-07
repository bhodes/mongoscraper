var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String,
    required: true,
    unique: true
  },

  saved: {
    type: Boolean,
    required: true,
    default: false
  },

  comments:[{
        type: Schema.ObjectId,
        ref:'comment'
    }]
});


var Article = mongoose.model("article", ArticleSchema);

module.exports = Article;