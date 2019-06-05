use library;

create view copyNr as
	select ISBN, count(*) as num
    from copies
    group by ISBN;
    
create view category_names as
	select categoryName
    from categories;