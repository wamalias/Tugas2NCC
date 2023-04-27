const mysql = require('mysql');
// buat konfigurasi koneksi
const dbconnection = mysql.createConnection({
    host: 'localhost',
    user: 'was',
    password: '123456789',
    database: 'ncc_crud',
    multipleStatements: true
});
// koneksi database
dbconnection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected to was@localhost in ncc-crud Database');
});
module.exports = dbconnection;
