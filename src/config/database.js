const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'document_upload_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  logging: true
});

const promisePool = pool.promise();

module.exports = promisePool;