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

// const promisePool = mysql.createPool({
// host: 'paradb.clkwcssiqip4.ap-south-1.rds.amazonaws.com',
//   port: 3306,
//   user: 'admin',
//  password: 'iq6jmXRklqR9eATkVuqp',
//   database: 'paraDB',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// module.exports = { promisePool };