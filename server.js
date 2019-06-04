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
  database: "library",
  dateStrings: true
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.route('/')
.get((req, res) => {
  //console.log(req.query.table);
  con.query(`select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS
    where TABLE_NAME = \'${req.query.table}\';`, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.route('/table')
.post((req, res) => {
  con.query(`insert into ${req.body.table}(${Object.keys(req.body.insertTuple).join(',')})
  values(\'${Object.values(req.body.insertTuple).join('\',\'')}\');`, (err, result) => {
    res.send({err: err, result: result});
  });
})
.get((req, res) => {
  //console.log(req.query.table);
  con.query(`select * from library.${req.query.table};`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
})
.delete((req,res)=>{

  con.query(`SHOW KEYS FROM library.${req.query.table} WHERE Key_name = \'PRIMARY\'`,(err,result) =>{
    console.log(result[0].Column_name);
    var obj = JSON.parse(req.query.value);
    console.log(obj);
    con.query(`delete from library.${req.query.table} where ${result[0].Column_name} = ${obj.authorID};`,
      (err) => {
        if (err) throw err;
      });
      con.query(`select * from library.${req.query.table};`, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    //pk=result[0].Column_name;
  });
  //console.log(pk);

});
