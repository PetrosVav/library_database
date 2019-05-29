const mysql = require('mysql');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;

app.listen(port);

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "library"
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.route('/')
.get((req, res) => {
  console.log(req.query.table);
  con.query(`select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS
    where TABLE_NAME = \'${req.query.table}\';`, (err, result) => {
      if (err) throw err;
      res.send(result);
      console.log(result);
    });
});

app.route('/books')
.post((req, res) => {
  con.query(`insert into books(ISBN, title, pubYear, numpages, pubName)
  values(\'${req.body.isbn}\', \'${req.body.title}\', ${req.body.pubYear}, ${req.body.numPage}, \'${req.body.pubName}\');`);
  console.log(req.body);
  res.send({status: 'succ'});
})
.get((req, res) => {
  console.log(req.query.table);
  con.query(`select * from library.${req.query.table};`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
