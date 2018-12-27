const pool = require('../lib/db');
const crypto = require('crypto');

function search(search_string, func) {
	 pool.query(
	 	"SELECT question, answer, created_at, answered_at FROM questions WHERE question_tokens @@ to_tsquery($1)", 
	 	[search_string],
	 	function(err, result) {	
			 console.log(result);
			  
		    if(err) {
		    	func([])
		    } else {
		    	func(result.rows)
		    }
		}
	);
}

function new_question(qst_text, func) {
	const text = 'INSERT INTO questions(created_at, item_hash, question, status) VALUES(current_timestamp, $1, $2, $3) RETURNING *'
	const values = [crypto.createHash('md5').update(qst_text).digest("hex"), qst_text, 'waiting_approval']
	pool.query(text, values, (err, res) => {
		if (err) {
		  console.log(err.stack)
		} else {
		  console.log(res.rows[0])
		  func(res.rows[0])
		}
	  })
}

/*
function new_table() {
	const text =  `CREATE TABLE QUESTIONS(
		ID SERIAL PRIMARY KEY,
		CREATED_AT        DATE    NOT NULL,
		ITEM_HASH	   TEXT NOT NULL,
		QUESTION       TEXT    NOT NULL,
		ANSWER         TEXT,
		STATUS         TEXT,
		WHO_ANSWERED_ID   TEXT,
		ANSWERED_AT DATE,
		QUESTION_CAT   TEXT,
		QUESTION_TOKENS TSVECTOR
	 )`
	const values = ['test', 'table created']
	pool.query(text, (err, res) => {
		console.log(err, res);
		if (err) {
			console.log(err.stack)
		  } else {
			return res;
		  }
		});

}

function drop_table() {
	const text =  `DROP TABLE QUESTIONS`
	pool.query(text, (err, res) => {
		console.log(err, res);
		if (err) {
			console.log(err.stack)
		  } else {
			return res;
		  }
	});

}
*/

module.exports = {search, new_question}

/*


 INSERT INTO QUESTIONS (ID,CREATED,QUESTION,STATUS) VALUES (1, CURRENT_TIMESTAMP, 'Come posso fare una domanda?', 'waiting_approval');

 UPDATE questions d1  
SET question_tokens = to_tsvector(d1.question)  
FROM questions d2; 

CREATE INDEX textsearch_idx ON questions USING GIN (fts);

INSERT INTO questions(created_at, question, status)
    VALUES (current_timestamp, 'la mia domanda', 'waiting_approval');

 */