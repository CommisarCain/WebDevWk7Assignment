/****************************************************************
* Express/Handlebars/Engine Setup
****************************************************************/
var express  = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', 3000);


/****************************************************************
* View Handling
****************************************************************/
app.get('/', function(req, res){
   res.render('readback');
});


app.get('/readback', function(req, res){
   var q = [];

   for (var p in req.query){
    q.push({'name':p,'value':req.query[p]})
   }

   var context = {};
   context.theheader = "Get Request Recieved";
   context.queryList = q;

   res.render('readback',context);
});


app.post('/readback', function(req, res){
   var q = [];

   for (var p in req.query){
   q.push({'name':p,'value':req.query[p]});
   }

   var context = {};
   context.theheader = "Post Request Recieved";
   context.queryList = q;

   var po = [];

   for (var p in req.body){
   po.push({'name':p,'value':req.body[p]});
   }
   context.postList = po;

   res.render('readback',context);
});



/****************************************************************
* Server Error / Catch All Setup
****************************************************************/
app.use(function(req,res){
   res.type('text/plain');
   res.status(404);
   res.send(' 404 - Not Found');
});

app.use(function(err, req, res, next){
   console.error(err.stack);
   res.type('plain/text');
   res.status(500);
   res.send('500 - server error');
});

app.listen(app.get('port'),function(){
       console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
/* EOF */
