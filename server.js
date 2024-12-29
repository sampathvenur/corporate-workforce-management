const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname)); 

// Connect to MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root96',
    database: 'corporate_workforce_management'
});

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle add data request
app.post('/addData', (req, res) => {
    const table = req.body.table; 
    const data = req.body.data; 

    // Construct SQL INSERT query dynamically
    let sql = `INSERT INTO ${table} SET `;
    const values = [];
    for (const key in data) {
        sql += `${key} = ?, `;
        values.push(data[key]);
    }
    sql = sql.slice(0, -2); // Remove trailing comma

    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding data: ' + err.message); 
        } else {
            res.send('Data added successfully');
        }
    });
});

// Handle show table request
app.get('/getTableData', (req, res) => {
    const tableName = req.query.table;

    pool.query(`SELECT * FROM ${tableName}`, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching data: ' + err.message); 
        } else {
            res.json(results);
        }
    });
});

// Handle custom query request
app.post('/executeQuery', (req, res) => {
    const query = req.body.query;

    if (/drop/i.test(query)) {
        return res.status(400).send('Warning: DROP queries are not allowed.');
    }
    
    pool.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error executing query: ' + err.message); 
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});