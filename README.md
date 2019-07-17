# Library Database Project

One Paragraph of project description goes here

## Team members

* [Peter Vavaroutsos](https://github.com/petrosvav)
* [Peter Tzathas](https://github.com/pettza)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

We need to have MySql and NodeJS installed.

### Execution instructions

* In a windows terminal we go to the desktop folder where the file package.json exists and we run the following command

```
npm install
```

* With the Mysql service on, we run the following files in order to create the database tables, views and triggers.

```
library_creation.sql
```
```
library_views.sql
```
```
library_triggers.sql
```

* In order to fill the database with some example values, for test purposes, you can run our file
```
library_filling.sql
```

or you can do it manually.

* Now for the front-end server (localhost:3000) and the back-end server (localhost:5000) activation we run 

```
npm run-dev
```

## Deployment

In a web browser hit the following address

```
https://localhost:3000
```
### Note
* The connection to the database is established in the file server.js. In order to be syccessful it is necessary to change the connection credentials (e.g. our username is root and password is also root).

* The front-end is configured in all the files that are in the folder /src

## Built With

* [ReactJS](https://reactjs.org/) - The web framework used
* [MySQL](https://www.mysql.com/) - Database
