const express = require('express');
const bodyParser = require('body-parser');
const dbconnection = require('./config/database');
const app = express();
const PORT = process.env.PORT || 5000;

// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// read data / get all data
app.get("/", (req, res) => {
    // buat query sql
    const querySql = 'SELECT * FROM rekapstokbarang';

    // jalankan query
    dbconnection.query(querySql, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'There is an error', error: err });
        }

        // jika request berhasil
        res.status(200).json({ data: rows });
    });

    return 0;
});

// read data / get data by id
app.get("/:id", (req, res) => {
    // buat query sql
    const querySql = 'SELECT * FROM rekapstokbarang WHERE ID_Barang = ?';

    // jalankan query
    dbconnection.query(querySql, req.params.id, (err, rows, field) => {
            // error handling
            if (err) {
                return res.status(500).json({ message: 'There is an error', error: err });
            }

            // jika request berhasil
            if(rows.length){
                res.status(200).json({ data: rows });
            } else {
                return res.status(404).json({ message: 'Data Not Found!'});
            }
        });    
    return 0;
});


// create data / insert data
app.post("/", (req, res) => {
    // buat variabel penampung data dan query sql
    const data =  { ...req.body };
    const querySql = 'INSERT INTO `rekapstokbarang` SET ?';

    //Validation
    if(!data['ID_Barang']){
        return res.status(400).json({ errors: 'ID_Barang must be inputed with value not null'});
    }
    if(!data['Nama_Barang']){
        return res.status(400).json({ errors: 'Nama_Barang must be inputed with value not null'});
    }
    if(!data['Harga']){
        return res.status(400).json({ errors: 'Harga must be inputed with value not null'});
    }
    if(!data['Jumlah_Stok']){
        return res.status(400).json({ errors: 'Jumlah_Stok must be inputed with value not null'});
    }

    // jalankan query
    dbconnection.query(querySql, data, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'There is an error', error: err });
        }

        // jika request berhasil
        res.status(201).json({message: 'Successsfully Insert Data!' });
    });

    return 0;
});

// update data
app.put("/:id", (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySearch = 'SELECT * FROM rekapstokbarang WHERE ID_Barang = ?';
    const queryUpdate = 'UPDATE rekapstokbarang SET ? WHERE ID_Barang = ?';

    // jalankan query untuk melakukan pencarian data
    dbconnection.query(querySearch, req.params.id, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'There is an error', error: err });
        }

        // jika id yang dimasukkan sesuai dengan data yang ada di db
        if (rows.length) {
            //Validation
            if(!data['ID_Barang']){
                return res.status(400).json({ errors: 'ID_Barang must be inputed with value not null'});
            }
            if(!data['Nama_Barang']){
                return res.status(400).json({ errors: 'Nama_Barang must be inputed with value not null'});
            }
            if(!data['Harga']){
                return res.status(400).json({ errors: 'Harga must be inputed with value not null'});
            }
            if(!data['Jumlah_Stok']){
                return res.status(400).json({ errors: 'Jumlah_Stok must be inputed with value not null'});
            }

            // jalankan query update
            dbconnection.query(queryUpdate, [data, req.params.id], (err, rows, field) => {
                // error handling
                if (err) {
                    return res.status(500).json({ message: 'There is an error', error: err });
                }

                // jika update berhasil
                res.status(200).json({message: 'Succesfully Update Data!' });
            });
        } else {
            return res.status(404).json({ message: 'Data Not Found!' });
        }
    });

    return 0;
});

// delete data
app.delete("/:id", (req, res) => {
    // buat query sql untuk mencari data dan hapus
    const querySearch = 'SELECT * FROM rekapstokbarang WHERE ID_Barang = ?';
    const queryDelete = 'DELETE FROM rekapstokbarang WHERE ID_Barang = ?';

    // jalankan query untuk melakukan pencarian data
    dbconnection.query(querySearch, req.params.id, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'There is an error', error: err });
        }

        // jika id yang dimasukkan sesuai dengan data yang ada di db
        if (rows.length) {
            // jalankan query delete
            dbconnection.query(queryDelete, req.params.id, (err, rows, field) => {
                // error handling
                if (err) {
                    return res.status(500).json({ message: 'There is an error', error: err });
                }

                // jika delete berhasil
                res.status(200).json({message: 'Succesfully Delete Data!' });
            });
        } else {
            return res.status(404).json({ message: 'Data Not Found!'});
        }
    });

    return 0;
});

// buat server nya
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));