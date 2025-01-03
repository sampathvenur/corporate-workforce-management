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

## How to Configure MySQL and Docker for This Project

If you're using Docker and running MySQL in a container, follow these steps to configure the database and ensure everything works smoothly:

### Step 1: Verify the User Exists

1. Log in to MySQL from the host system:

   ```bash
   mysql -u root -p
   ```

2. Check if the user exists and has the correct host specified:

   ```sql
   SELECT Host, User FROM mysql.user WHERE User = 'username';
   ```

   Look for an entry like `'username'@'host.docker.internal'`. If it doesn't exist, you'll need to create or update the user.

---

### Step 2: Create or Update the User

1. If the user `'username'@'host.docker.internal'` does not exist, create it:

   ```sql
   CREATE USER 'username'@'host.docker.internal' IDENTIFIED BY 'password';
   ```

2. If the user exists but from a different host, update the host:

   ```sql
   UPDATE mysql.user SET Host = 'host.docker.internal' WHERE User = 'username';
   ```

---

### Step 3: Grant Permissions

1. Grant the necessary privileges to the user:

   ```sql
   GRANT ALL PRIVILEGES ON *.* TO 'username'@'host.docker.internal';
   FLUSH PRIVILEGES;
   ```

---

### Step 4: Test the Connection

1. Retry connecting from the command line:

   ```bash
   mysql -u username -p -h host.docker.internal -P 3306
   ```

---

### Step 5: If Issues Persist (Alternative Wildcard Host)

1. If MySQL still doesn't recognize `host.docker.internal`, use `%` to allow access from any host:

   ```sql
   CREATE USER 'username'@'%' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON *.* TO 'username'@'%';
   FLUSH PRIVILEGES;
   ```

   This grants access to the user from any host, which is fine for development but not secure for production.

---

### Step 6: Restart MySQL

1. After making changes, restart the MySQL service to ensure all configurations are applied:

   - On Linux:
     ```bash
     sudo systemctl restart mysql
     ```
   - On Windows: Restart the MySQL service through the Services Manager.

---
To run the Docker image locally as a container, you can add a section to the README that explains how to build and run the Docker image. Here's how you can structure it:

---

## Running the Project in a Docker Container

To run this project locally in a Docker container, follow these steps:

### Step 1: Install Docker

Ensure Docker is installed on your machine. You can download Docker from the official website:

- [Docker for Windows](https://www.docker.com/products/docker-desktop)
- [Docker for macOS](https://www.docker.com/products/docker-desktop)
- [Docker for Linux](https://docs.docker.com/get-docker/)

### Step 2: Build the Docker Image

1. Navigate to the project directory where your `Dockerfile` is located.

2. Build the Docker image using the following command:

   ```bash
   docker build -t corporate-workforce-management .
   ```

   This will create a Docker image named `corporate-workforce-management`.

### Step 3: Run the Docker Container

1. After building the image, you can run it as a container with the following command:

   ```bash
   docker run -d -p 3000:3000 --name corporate-workforce-management-container corporate-workforce-management
   ```

   - `-d` runs the container in detached mode.
   - `-p 3000:3000` maps port 3000 of the container to port 3000 on your host machine.
   - `--name corporate-workforce-management-container` gives the container a specific name.
   - `corporate-workforce-management` is the name of the image to run.

2. Once the container is running, the application should be accessible in your browser at:

   ```
   http://localhost:3000
   ```

---

### Step 4: Connect to MySQL Inside the Container

If MySQL is running inside the container and you need to interact with it, use the following command to enter the MySQL CLI within the container:

1. Find the container ID of the MySQL container:

   ```bash
   docker ps
   ```

2. Use the container ID to execute commands inside the MySQL container:

   ```bash
   docker exec -it <container_id> mysql -u root -p
   ```

---

### Step 5: Stopping the Docker Container

To stop the running container, use the following command:

```bash
docker stop corporate-workforce-management-container
```

If you want to remove the container after stopping it:

```bash
docker rm corporate-workforce-management-container
```

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
