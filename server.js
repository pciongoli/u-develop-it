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

// Get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
    db.query(sql, (err, rows) => {
        if (err) {
            // instead of logging error, send status code (500) and place the error message within a JSON object
            res.status(500).json({ error: err.message });
        }
        // if no error then error is null and response will be sent back
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// // GET a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            // notify client that their request wasnt accepted and try a different request
            res.status(400).json({ error: err.message });
        }
        // send row back to client in a JSON object
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Delete a candidate
// statement has "?" to denote a placeholder
// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});



// Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//                 VALUES (?,?,?,?)`;
//                 // ^ since table has 4 columns we need 4 placeholders for the values
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// handle user requests that arent supported by the app catchall route
// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// function to start the express server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});