// Import required modules
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // Optional: to enable cross-origin requests

// Create an Express application
const app = express();

// Use JSON middleware to parse JSON in requests
app.use(express.json());
app.use(cors());  // Optional: if you're making requests from a different domain

// Set up the MySQL connection
const db = mysql.createConnection({
  host: 'localhost', // MySQL server hostname
  user: 'root',      // Your MySQL username
  password: 'root96', // Your MySQL password
  database: 'corporate_workforce_management' // Name of your database
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Define a POST route for executing custom SQL queries
app.post('/execute-custom-query', (req, res) => {
  const query = req.body.query;

  // Validate the query to avoid dangerous queries
  if (checkForDangerousQueries(query)) {
    return res.status(400).json({ error: 'Unsafe query detected' });
  }

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Return the results
    return res.json({ result: results });
  });
});

// Define a route for showing details (fetch data from the database)
app.get('/show-details', (req, res) => {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);  // You can display this in the frontend
  });
});

// Start the Express server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Function to check for dangerous queries (e.g., DROP, DELETE)
function checkForDangerousQueries(query) {
  const dangerousKeywords = ['DROP', 'DELETE', 'ALTER', 'TRUNCATE', 'UPDATE'];
  return dangerousKeywords.some(keyword => query.toUpperCase().includes(keyword));
}
