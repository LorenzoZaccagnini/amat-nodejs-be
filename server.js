const express 		= require('express');
const app 			= express();
const bodyParser 	= require('body-parser');
var cors = require('cors'); 
app.use(cors());

const pg = require('pg');
const helper 		= require('./functions/helper.js');

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
	
	if (typeof req.body.question !== 'undefined') {
		helper.new_question(req.body.question, function(data_items) {
			res.send({
				response : {
					items : data_items
				}
			})
		})
	} else {
		res.send({error : 'no question sent', test: JSON.stringify(req.body)})
	}
})

app.post('/new_table', function(req, res) {
	
		helper.new_table(function(data_items) {
			res.send({
				response : {
					items : data_items
				}
			})
		})

})

app.post('/drop_table', function(req, res) {
	
	helper.drop_table(function(data_items) {
		res.send({
			response : {
				items : data_items
			}
		})
	})

})


app.post('/test', function(req, res) {
	res.send({test: req.body.question})
	
})


app.listen(port);
console.log(new Date() + ' => start server :' + port);
