const sql = require('mssql');

const config = {
    user: 'wardaas',
    password: 'RedAndGold150403',
    server: 'wasics.database.windows.net',
    database: 'ncc-crud',
  };
  
  const dbconnection = new sql.ConnectionPool(config);

// koneksi database
dbconnection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected to wasics.database.windows.net in ncc-crud Database');
});
module.exports = dbconnection;