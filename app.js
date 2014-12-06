var express = require('express');
var bodyParser = require('body-parser');

var app = express();
pg = require("pg");

config =  {
    database: "articles",
    port: 5432,
    host: "localhost"
};

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

var articles = [{title: 'article one', content: 'stuff in article one.'}, {title: 'article two', content: 'stuff in article two'}];

app.get('/articles', function (req,res) {
   pg.connect(config, function(err, client, done){
        if (err) {
             console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
        }
        client.query("SELECT * FROM articles", function (err, result) {
                      console.log(result);
            res.render('articles/index', {articlesList: result.rows});
           done();            
        });


    });


});

app.get('/articles/new', function (req,res) {
  res.render('articles/new');
});

app.get('/articles/show/:id', function (req,res){
  res.render('articles/show', {articleId: req.params.id});
});

app.post('/articles', function (req,res) {
pg.connect(config, function(err, client, done){
    if (err) {
         console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
    }
    client.query("SELECT * FROM articles", function (err, article) {
                  console.log(article);
        res.redirect('articles/show/' + article.rows[0].article_id);
       done();            
    });
   });
  //article.rows[0].article_id);
    
  // console.log(req.body);
  // // articles.push(req.body.article);
  // res.redirect('/articles');

});

app.get('/', function (req,res) {
  res.render('site/index.ejs');
});

app.get('/about', function (req,res) {
  res.render('site/about');
});

app.get('/contact', function (req,res) {
  res.render('site/contact');
});

app.listen(3000, function() {
  console.log('Listening');
});