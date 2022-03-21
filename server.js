const express = require('express');
// import mysql2 package
// import new module with our moved declarations
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

// port designation and app designation
const PORT = process.env.PORT || 3001;
const app = express();

// Express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// add after Express middleware
// Use apiRoutes
app.use('/api', apiRoutes);

// handle user requests that arent supported by the app catchall route
// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// function to start the express server on port 3001
// Start Server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
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
