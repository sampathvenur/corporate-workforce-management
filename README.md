# Corporate Workforce Management

A web application designed to manage corporate workforce data through a MySQL database. This project demonstrates the integration of a Node.js backend with a MySQL database to handle employees, departments, projects, and their interdependencies.

---

## Features

1. **Data Entry**: Add records to database tables via a form.
2. **Data Retrieval**: Fetch and display data from tables.
3. **Custom Queries**: Execute user-defined SQL queries.

---

## Project Structure

| File/Directory | Description |
|----------------|-------------|
| `add.html`     | Form interface for adding data to the database. |
| `custom.html`  | Interface for executing custom SQL queries. |
| `db.sql`       | SQL script to create and populate the database schema. |
| `index.html`   | Main landing page for navigation. |
| `server.js`    | Node.js backend for handling database operations. |
| `show.html`    | Interface to display data from the database. |

---

## Prerequisites

- [Node.js](https://nodejs.org/) (for the server)
- [MySQL](https://www.mysql.com/) (for the database)

---

## Installation and Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/sampathvenur/corporate-workforce-management.git
cd corporate-workforce-management
```

### Step 2: Set Up the Database
1. Install MySQL and start the MySQL server.
2. Log in to the MySQL CLI:
   ```bash
   mysql -u root -p
   ```
3. Execute the `db.sql` script to create the database and populate it with sample data:
   ```sql
   SOURCE db.sql;
   ```

### Step 3: Install Node.js Dependencies
1. Install the required packages for the Node.js backend:
   ```bash
   npm install express mysql2
   ```

### Step 4: Configure and Start the Server
1. Open `server.js` and configure the database credentials in the `mysql.createPool` function:
   ```javascript
   const pool = mysql.createPool({
       host: 'localhost',
       user: 'your_mysql_user',
       password: 'your_mysql_password',
       database: 'corporate_workforce_management'
   });
   ```
2. Start the server:
   ```bash
   node server.js
   ```
3. Verify the server is running:
   ```
   Server listening on port 3000
   ```

### Step 5: Access the Application
1. Open `index.html` in a web browser.
2. Navigate to different sections for data entry, retrieval, and custom queries.

---

## API Endpoints (Backend Functionality)

1. **Add Data**: 
   - **Endpoint**: `/addData` (POST)
   - **Description**: Inserts a record into the specified table.
   - **Request Body**:
     ```json
     {
       "table": "TABLE_NAME",
       "data": {
         "COLUMN_1": "VALUE_1",
         "COLUMN_2": "VALUE_2"
       }
     }
     ```
   - **Response**: Success message or error details.

2. **Fetch Table Data**:
   - **Endpoint**: `/getTableData` (GET)
   - **Description**: Retrieves all records from the specified table.
   - **Query Parameters**:
     ```json
     {
       "table": "TABLE_NAME"
     }
     ```
   - **Response**: JSON array of records.

3. **Execute Custom Query**:
   - **Endpoint**: `/executeQuery` (POST)
   - **Description**: Executes a custom SQL query.
   - **Request Body**:
     ```json
     {
       "query": "SQL_QUERY"
     }
     ```
   - **Response**: Query results or error details.

---

## How to Use

1. **Add Data**:
   - Navigate to `add.html` to insert records.
   - Select a table and fill in the required fields.

2. **View Data**:
   - Open `show.html` to fetch and display records from a table.

3. **Custom Queries**:
   - Use `custom.html` to execute SQL queries of your choice.

---

## Contribution Guidelines

We welcome contributions! Follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add YourFeature"
   ```
4. Push your changes:
   ```bash
   git push origin feature/YourFeature
   ```
5. Submit a pull request.

---

## Contact

For queries or feedback, feel free to open an issue.
