const mysql = require('mysql');
// buat konfigurasi koneksi
const dbconnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    //password: 'password_kalian',
    database: 'ncc-crud',
    multipleStatements: true
});
// koneksi database
dbconnection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected to root@127.0.0.1 in ncc-crud Database');
});
module.exports = dbconnection;