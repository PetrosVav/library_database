select title, num from books join copynr;

select publName, num 
from publishers join (
	select pubName, count(*) as num from books group by pubName
    ) 
order by num desc;
    
select title, copyNr, MFirst, MLast
from books as b 
	join borrows as brw on b.ISBN = brw.ISBN 
	join members as m on m.memberID = brw.memberID
where date_of_return = null;

#φερε τα ονοματα των εργαζομενων που εχουν στειλει πανω απο 3 reminds
select EFirst, ELast, count(*) as 'Num of Reminds'
from employees as e join reminders as r on e.empID=r.empID
group by e.empID
having 'Num of Reminds' > 3;


with avg_salary as
	(select avg(salary) from employees)
select EFirst, ELast from employees where salary>avg_salary;

select title from books as b 
join written_by as w on b.ISBN=w.ISBN 
join authors as a on a.authID=w.authID
where a.AFirst = 'Stephen' and a.ALast = 'King';

with counts(cat,num) as (
	select categoryName as cat, count(*) as num
    group by categoryName
), max_count as (
	select max(num) from counts
)
select cat from count where num = max_count;


select count(*) as num
from categories as c join belongs_to as b
group by categoryName
