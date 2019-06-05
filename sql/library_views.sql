use library;

create view copyNr  as
	select ISBN, count(*) as num
    from copies
    group by ISBN;