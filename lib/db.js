const pg = require('pg');
require('dotenv').load();

var config = {
  user: process.env.USER,  
  database: process.env.DATABASE,  
  password: process.env.PASSWORD, 
  host: process.env.HOST, 
  port: process.env.PORT, 
  max: process.env.MAX, // max number of clients in the pool 
  idleTimeoutMillis: process.env.IDLE, // how long a client is allowed to remain idle before being closed 
};
 
const pool = new pg.Pool(config);
 
pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack);
});
 
module.exports.query = function (text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};
 
module.exports.connect = function (callback) {
  return pool.connect(callback);
};