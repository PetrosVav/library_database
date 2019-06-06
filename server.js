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

//Set up connection to database
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "library",
  dateStrings: true
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.route('/')
//Returns the columns of a table
.get((req, res) => {
  con.query(`select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS
  where TABLE_NAME = \'${req.query.table}\';`, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.route('/table')
//Performs insertions or updates based on an option specified in the request
.post((req, res) => {
  if(!req.body.update)
    con.query(`insert into ${req.body.table}(${Object.keys(req.body.insertTuple).join(',')})
    values(\'${Object.values(req.body.insertTuple).join('\',\'')}\');`, (err, result) => {
      res.send({err: err, result: result});
    });
  else {
    con.query(`update ${req.body.table}
	set ${Object.entries(req.body.insertTuple).map( (x) => {return x[0]+" = \'"+x[1]+"\' "})}
	where ${req.body.pk} = '${req.body.pkValue}';`,
	(err,result) => {
		res.send({err:err, result:result});
	});
  }
})
//Returns the table specified in the request
.get((req, res) => {
  //console.log(req.query.table);
  con.query(`select * from library.${req.query.table};`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
})
//Deletes a row
.delete((req,res)=>{

  con.query(`SHOW KEYS FROM library.${req.query.table} WHERE Key_name = \'PRIMARY\'`,(err,result) => {
    console.log(result[0].Column_name);
    var obj = JSON.parse(req.query.value);
	con.query(`delete from library.${req.query.table} where ${result[0].Column_name} = ${obj[result[0].Column_name]};`, (err) => {
		if (err) throw err;
	});
	con.query(`select * from library.${req.query.table};`, (err, result) => {
        if (err) throw err;
        res.send(result);
	});
  });
});

//Performs queries
app.route('/query')
.get( (req, res) => {
  var query;
  switch (req.query.query) {
    case("Publishings"):
      query =
        `select temp.pubName, num
         from publishers join (
           select pubName, count(*) as num from books group by pubName
         ) as temp on publishers.pubName = temp.pubName
         order by num desc;`;
      break;
    case("Borrowings"):
      query =
        `select title, copyNr, MFirst, MLast
         from books as b
         join borrows as brw on b.ISBN = brw.ISBN
         join members as m on m.memberID = brw.memberID
         where date_of_return is null;`;
      break;
    case("MoreThanThreeReminders"):
      query =
        `select EFirst, ELast, count(*) as remindNum
         from employees as e join reminders as r on e.empID=r.empID
         group by e.empID
         having remindNum > 3;`;
      break;
    case("WellPaidEmployees"):
      query =
        `with
          avg_salary as (select avg(salary) as s from employees)
         select EFirst, ELast from employees, avg_salary where salary > avg_salary.s;`;
      break;
    case("StephenKingBooks"):
      query =
        `select title
         from books as b
         join written_by as w on b.ISBN = w.ISBN
         join authors as a on a.authorID = w.authorID
         where a.AFirst = 'Stephen' and a.ALast = 'King';`;
      break;
    case("MostPopularCategories"):
      query =
        `with
          counts as (
            select categoryName as cat, count(*) as num
            from categories
            group by categoryName
          ),
          max_count as (
            select max(num) as c from counts
          )
        select cat from counts, max_count where num = max_count.c;`;
      break;
    case("CategoryCounts"):
      query =
        `select c.categoryName, count(*) as num
         from categories as c join belongs_to as b
         group by c.categoryName`;
      break;
    default:
      break;
  }
  //console.log(req.query.table);
  con.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
