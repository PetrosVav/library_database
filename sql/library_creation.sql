drop database library;

create database library;

use library;

create table members (
	memberID int auto_increment primary key,
    MFirst text not null check(MFirst <> ''),
    MLast text not null check(MLast <> ''),
    street text not null check(street <> ''),
    strNum int unsigned not null,
    postalCode dec(5) unsigned not null,
    MBirthdate date not null
);

create table authors (
	authorID int auto_increment primary key,
    AFirst text not null check(AFirst <> ''),
    ALast text not null check(ALast <> ''),
    ABirthdate date not null
);

create table publishers (
	pubName varchar(30) not null primary key check(pubName <> ''),
    estYear year not null,
    street text not null check(street <> ''),
    strNum int unsigned not null,
    postalCode dec(5) unsigned not null
);

create table books (
	ISBN varchar(13) primary key,
    title text not null check(title <> ''),
    pubYear year not null,
    numpages int unsigned not null,
    pubName varchar(30) not null,
    foreign key (pubName) references publishers(pubName),
    constraint ISBN_chk check (ISBN not like '%[^0-9]%' and (length(ISBN) = 10 or length(ISBN) = 13))
);

create table written_by (
	ISBN varchar(13),
    authorID int not null,
    primary key (ISBN, authorID),
	foreign key (ISBN) references books(ISBN),
    foreign key (authorID) references authors(authorID)
);

create table categories (
	categoryName varchar(30) primary key check(categoryName <> ''),
	supercategoryName varchar(30) null,
    foreign key (supercategoryName) references categories(categoryName)
);

create table belongs_to (
	ISBN varchar(13),
    categoryName varchar(30),
    primary key (ISBN, categoryName),
	foreign key (ISBN) references books(ISBN),
    foreign key (categoryName) references categories(categoryName)
);

create table copies (
	ISBN varchar(13),
    copyNr int unsigned,
    shelfPosition int unsigned not null,
    primary key (ISBN, copyNr),
    foreign key (ISBN) references books(ISBN)
);

create table employees (
	empID int auto_increment primary key,
    EFirst text not null check(EFirst <> ''),
    ELast text not null check(ELast <> ''),
    salary dec(5,2) unsigned not null
);

create table permanent_employee (
	empID int primary key,
    HiringDate date not null,
    foreign key (empID) references employees(empID)
);

create table temporary_employee (
	empID int primary key,
    ContractNr int unsigned not null,
    foreign key (empID) references employees(empID)
);

create table borrows (
	bID int auto_increment primary key,
    memberID int not null,
    ISBN varchar(13) not null,
    copyNr int unsigned not null,
    date_of_borrowing date not null,
    date_of_return date,
    foreign key (memberID) references members(memberID),
    foreign key (ISBN, copyNr) references copies(ISBN, copyNr),
    constraint chk_date check (date_of_return > date_of_borrowing)
);

create table reminder (
	rID int auto_increment primary key,
    empID int not null,
    bID int not null,
    date_of_reminder date not null,
    foreign key (empID) references employees(empID),
    foreign key (bID) references borrows(bID)
);