const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mysql = require('mysql2');
const { get } = require('express/lib/response');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { application } = require('express');



const app = express();
app.use(cors());
app.use(bodyparser.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book',
    port: 3306
})

db.connect(err => {
    if (err) {
        console.log('dberr')
    }
    console.log('Database connected..')
})

//get all data

app.get('/book', (req, res) => {
    let qr = `select * from book`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: 'all book data',
                data: result
            })
        }
    })
})

// get single data

app.get('/book/:id', (req, res) => {

    let gId = req.params.id;

    let qr = `select * from book where id = ${gId}`

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: 'Get single data',
                data: result
            })
        }
        else {
            res.send({
                message: 'data not found'
            })
        }
    })
})

//post data

app.post('/book', (req, res) => {

    console.log(req.body, 'createdata');

    let bookid = req.body.bookid;
    let bookname = req.body.bookname;
    let author = req.body.author;

    let qr = ` insert into book (bookid,bookname,author) 
                values ( '${bookid}' ,'${bookname}','${author}' )`;

    db.query(qr, (err, result) => {
        if (err) { console.log(err) }
        console.log(result, 'result')
        res.send({
            message: 'Data Inserted'
        })


    })
})

//put data

app.put('/book/:id', (req, res) => {
    console.log(req.body, 'updatedata');

    let gId = req.params.id;
    let bookid = req.body.bookid;
    let bookname = req.body.bookname;
    let author = req.body.author;

    let qr = `update book set bookid = '${bookid}' ,bookname = '${bookname}' ,author = '${author}'
                where id = ${gId}`;

    db.query(qr, (err, result) => {
        if (err) { console.log('err') }
        res.send({
            message: 'Data updated'
        })
    })
})

//delete data
app.delete('/book/:id', (req, res) => {
    let gId = req.params.id;
    let qr = `delete from book where id = '${gId}'`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err) }
        res.send({
            message: 'Data Deleted'
        })
    })
})





app.listen(3000, () => {
    console.log(`Server is running `)
})






