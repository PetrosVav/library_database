use library;

insert into members
(MFirst, MLast, street, strNum, postalCode, MBirthdate)
values
('Petros', 'Vavaroutsos', 'Papagoy', '3', '13431', '1997-07-20'),
('Petros', 'Tzathas', 'Papagoy', '140', '13431', '1997-06-22'),
('Gus', 'Tiger','Light','90','18239','1980-09-23'),
('Elton', 'John','Baker','120','10239','1960-09-23'),
('John', 'Fighter','Dark','190','16239','1975-05-03');

INSERT INTO authors
(AFirst, ALast, ABirthdate)
VALUES
('Truman', 'Capote', '1924-09-30'),
('George', 'Orwell', '1923-08-29'),
('Stephen', 'King', '1954-04-04'),
('Jo', 'Nesbo', '1973-02-21'),
('J. K.', 'Rowling', '1980-11-23');

INSERT INTO publishers
(pubName, estYear, street, strNum, postalCode)
VALUES
('Donkey', 1990, 'Maple', 12, 13431),
('Pataki', 1980, 'Baker', 102, 15431),
('Okeanos', 1999, 'Mape', 1, 14331),
('Symmetria', 1979, 'Kokkinopoulou', 142, 13413),
('Attiki', 1921, 'Marble', 212, 13431);


INSERT INTO books
(ISBN, title, pubYear, numpages, pubName)
VALUES
('1234567890', 'Harry Potter 1', '2099', '500', 'Donkey'),
('1234567891', 'Harry Potter 2', '2001', '500', 'Donkey'),
('1234567892', 'Harry Potter 3', '2004', '600', 'Attiki'),
('1234567893', 'Harry Potter 4', '2005', '600', 'Pataki'),
('1234567894', 'Harry Potter 5', '2006', '800', 'Pataki'),
('1234567895', 'Hunger Games 1', '2005', '500', 'Okeanos'),
('1234567896', 'Hunger Games 2', '2007', '400', 'Symmetria'),
('1234567897', 'Hunger Games 3', '2009', '400', 'Attiki'),
('1234567898', 'Robotics','1993','800','Symmetria'),
('1234567899', 'Biomechanics','1996','700','Okeanos'),
('1234567900', 'It chapter 1','1996','600','Okeanos'),
('1234567901', 'It chapter 2','1998','700','Okeanos');


insert into copies
(ISBN, shelfPosition)
values
('1234567890', '16'),
('1234567891', '0'),
('1234567892', '1'),
('1234567892', '2'),
('1234567893', '3'),
('1234567893', '4'),
('1234567893', '5'),
('1234567893', '6'),
('1234567893', '7'),
('1234567894', '8'),
('1234567894', '9'),
('1234567894', '10'),
('1234567895', '11'),
('1234567895', '12'),
('1234567895', '13'),
('1234567896', '14'),
('1234567897', '15'),
('1234567898', '17'),
('1234567899', '18');

insert into
  categories (categoryName,supercategoryName)
  VALUES
  ('Novel',null),
  ('Horror','Novel'),
  ('Police','Novel'),
  ('Drama','Novel'),
  ('Fiction','Novel'),
  ('Adventure','Novel'),
  ('Scientific',null),
  ('Law','Scientific'),
  ('Medical','Scientific'),
  ('Engineer','Scientific');

insert into borrows
(memberID, ISBN, copyNr, date_of_borrowing)
values
('1', '1234567891', '1', '2019-05-20'),
('2', '1234567892', '1', '2019-04-20'),
('3', '1234567893', '2', '2019-04-20'),
('4', '1234567899', '1', '2019-04-20');

insert into belongs_to
  (ISBN,categoryName)
values
('1234567890','Fiction'),
('1234567891','Fiction'),
('1234567892','Fiction'),
('1234567893','Fiction'),
('1234567894','Fiction'),
('1234567895','Fiction'),
('1234567896','Fiction'),
('1234567897','Fiction'),
('1234567898','Engineer'),
('1234567899','Medical');

insert into employees
  (EFirst, ELast, salary)
values
  ('Petros','Tousis','30000.43'),
  ('Petros','Kiousis','3000.43'),
  ('Panos','Katos','44000.98'),
  ('Tolis','Kolkas','14400.98'),
  ('Bill','Kalkos','54300.98');

  insert into written_by
    (ISBN,authorID)
  values
    ('1234567900','3'),
    ('1234567901','3'),
    ('1234567890','5');

  insert into reminders
    (empID, bID, date_of_reminder)
  VALUES
  ('1','3','2019-06-05'),
  ('1','3','2019-06-05'),
  ('2','1','2019-06-04');
