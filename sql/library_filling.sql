use library;

insert into members
(MFirst, MLast, street, strNum, postalCode, MBirthdate)
values
('Pnikas', 'Papantonakis', 'DenThymamai', 3, 13431, '1997-07-20'),
('Andreas', 'Georgis', 'DenThymamai', 4, 13431, '1997-06-22');

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
('Donkey', 1990, 'Maple', 12, 13431);

INSERT INTO books
(ISBN, title, pubYear, numpages, pubName)
VALUES
(1234567890, 'Harry Potter', 2000, 100, 'Donkey');

insert into copies
(ISBN, shelfPosition)
values
('1234567890', 1),
('1234567890', 2);

insert into borrows
(memberID, ISBN, copyNr, date_of_borrowing)
values
(1, '1234567890', 1, '2019-07-20');