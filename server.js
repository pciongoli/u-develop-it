// import mysql2 package
const mysql = require('mysql2');
const express = require('express');

// port designation and app designation
const PORT = process.env.PORT || 3001;
const app = express();

// Express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect the application to MYSQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username
        user: 'root',
        // Your MySQL password
        password: '',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

// query the database to test the connection
// rows is the database query response 
// key component that allows SQL commands to be written in Node application
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

// handle user requests that arent supported by the app catchall route
// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// function to start the express server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});