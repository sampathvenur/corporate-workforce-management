const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname)); 

// Connect to MySQL
const pool = mysql.createPool({
    // Prioritize using the Docker host if available, otherwise fall back to localhost
    host: process.env.MYSQL_HOST || 'host.docker.internal' || 'localhost', 
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

    // Validate table name against whitelist
    const validTables = ['employee', 'department', 'dlocation', 'project', 'workson', 'dependent'];
    if (!validTables.includes(table.toLowerCase())) {
        return res.status(400).send('Invalid table name');
    }

    // Construct SQL INSERT query using prepared statements
    const columns = Object.keys(data);
    const placeholders = columns.map(() => '?').join(', ');
    const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
    const values = Object.values(data);

    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding data'); // Don't send error details to client
        } else {
            res.send('Data added successfully');
        }
    });
});

// Handle show table request
app.get('/getTableData', (req, res) => {
    const tableName = req.query.table;

    // Validate table name against whitelist
    const validTables = ['employee', 'department', 'dlocation', 'project', 'workson', 'dependent'];
    if (!validTables.includes(tableName.toLowerCase())) {
        return res.status(400).send('Invalid table name');
    }

    // Use prepared statement even for simple queries
    pool.query('SELECT * FROM ??', [tableName], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching data'); // Don't send error details to client
        } else {
            res.json(results);
        }
    });
});

// Handle custom query request
app.post('/executeQuery', (req, res) => {
    const query = req.body.query;

    // Basic security checks
    const forbiddenKeywords = [
        'drop',
        'truncate',
        'delete',
        'alter',
        'create',
        'insert',
        'update',
        'grant',
        'revoke'
    ];

    // Check for forbidden keywords
    if (forbiddenKeywords.some(keyword => 
        new RegExp(`\\b${keyword}\\b`, 'i').test(query))) {
        return res.status(400).send('Query contains forbidden operations');
    }

    // Limit to SELECT queries only
    if (!query.trim().toLowerCase().startsWith('select')) {
        return res.status(400).send('Only SELECT queries are allowed');
    }

    // Use query with parameters if possible
    pool.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error executing query'); // Don't send error details to client
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});