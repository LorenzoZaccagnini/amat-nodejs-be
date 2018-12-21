const pool = require('../lib/db');

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
	const text = 'INSERT INTO questions(created_at, question, status) VALUES(current_timestamp, $1, $2) RETURNING *'
	const values = [qst_text, 'waiting_approval']
	pool.query(text, values, (err, res) => {
		if (err) {
		  console.log(err.stack)
		} else {
		  console.log(res.rows[0])
		  func(res.rows[0])
		  // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
		}
	  })
}




module.exports = {search, new_question}

/*
CREATE TABLE QUESTIONS(
	ID INT PRIMARY KEY     NOT NULL,
	CREATED        DATE    NOT NULL,
	QUESTION       TEXT    NOT NULL,
	ANSWER         TEXT,
	STATUS         TEXT,
	WHO_ANSWERED_ID   TEXT,
	QUESTION_CAT   TEXT,
	QUESTION_TOKENS TSVECTOR
 );

 INSERT INTO QUESTIONS (ID,CREATED,QUESTION,STATUS) VALUES (1, CURRENT_TIMESTAMP, 'Come posso fare una domanda?', 'waiting_approval');

 UPDATE questions d1  
SET question_tokens = to_tsvector(d1.question)  
FROM questions d2; 

CREATE INDEX textsearch_idx ON questions USING GIN (fts);

INSERT INTO questions(created_at, question, status)
    VALUES (current_timestamp, 'la mia domanda', 'waiting_approval');

 */