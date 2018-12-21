const express 		= require('express');
const app 			= express();
const bodyParser 	= require('body-parser');
const pg = require('pg');
const helper 		= require('./functions/helper.js');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use(bodyParser.json());

const port = process.env.PORT || 3000;


app.get('/search', function(req, res) {
	if (typeof req.query.text !== 'undefined') {
		helper.search(req.query.text, function(data_items) {
			res.send({
				response : {
					items : data_items
				}
			})
		})
	} else {
		res.send({error : '[100] Not search params text in query.'})
	}
})

app.post('/new_question', function(req, res) {
	console.log(req.body.question);
	
	if (typeof req.body.question !== 'undefined') {
		helper.new_question(req.body.question, function(data_items) {
			res.send({
				response : {
					items : data_items
				}
			})
		})
	} else {
		res.send({error : 'no question sent', test: req.body.question})
	}
})



app.listen(port);
console.log(new Date() + ' => start server :' + port);
