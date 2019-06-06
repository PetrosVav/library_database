select temp.pubName, num 
from publishers join (
	select pubName, count(*) as num from books group by pubName
    ) as temp on publisher.pubName = temp.pubName
order by num desc;
    
select title, copyNr, MFirst, MLast
from books as b 
	join borrows as brw on b.ISBN = brw.ISBN 
	join members as m on m.memberID = brw.memberID
where date_of_return is null;

#φερε τα ονοματα των εργαζομενων που εχουν στειλει πανω απο 3 reminds
select EFirst, ELast, count(*) as remindNum
from employees as e join reminders as r on e.empID=r.empID
group by e.empID
having remindNum > 3;


with
	avg_salary as (select avg(salary) as s from employees)
select EFirst, ELast from employees, avg_salary where salary > avg_salary.s;

select title from books as b 
join written_by as w on b.ISBN = w.ISBN 
join authors as a on a.authorID = w.authorID
where a.AFirst = 'Stephen' and a.ALast = 'King';

with 
	counts as (
		select categoryName as cat, count(*) as num
        from categories
		group by categoryName
	), 
    max_count as (
		select max(num) as c from counts
	)
select cat from counts, max_count where num = max_count.c;


select c.categoryName, count(*) as num
from categories as c join belongs_to as b
group by c.categoryName
