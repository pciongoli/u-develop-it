const express = require('express');
// port designation
const PORT = process.env.PORT || 3001;
// app expression
const app = express();



// express.js middleware
app.use(express.urlencoded({ extended: false }));


// GET test route. Route method get() response method res.json()
app.get('/', (req, res) => {
    res.json({
        message: 'Hello'
    });
});

// handle user requests that arent supported by the app
// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});


// function to start the express server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});