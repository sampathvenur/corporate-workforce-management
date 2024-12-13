// Display.js

document.addEventListener('DOMContentLoaded', function() {
    const employeeSearchBtn = document.getElementById('employee-search-btn');
    const employeeIdInput = document.getElementById('employee-id');
    const employeeNameInput = document.getElementById('employee-name');
    const employeeDetailsDiv = document.getElementById('employee-details');
    
    // Listen for the search button click
    employeeSearchBtn.addEventListener('click', function() {
        const employeeId = employeeIdInput.value.trim();
        const employeeName = employeeNameInput.value.trim();

        // Clear previous results
        employeeDetailsDiv.innerHTML = '';

        // Validate that either employee ID or name is provided
        if (employeeId === '' && employeeName === '') {
            alert("Please enter either Employee ID or Employee Name.");
            return;
        }

        // Construct the query parameters
        let query = '';
        if (employeeId) {
            query = `SELECT * FROM employee WHERE employee_id = ${employeeId};`;
        } else if (employeeName) {
            query = `SELECT * FROM employee WHERE employee_name LIKE '%${employeeName}%';`;
        }

        // Send AJAX request to the server to fetch employee details
        fetch('/get-employee-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query })
        })
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                alert("No employee found with the given details.");
                return;
            }
            
            // Display employee details in the table
            displayEmployeeDetails(data);
        })
        .catch(err => {
            console.error('Error fetching employee data:', err);
            alert("An error occurred while fetching the employee data.");
        });
    });

    // Function to display employee details and related tables
    function displayEmployeeDetails(employeeData) {
        const employee = employeeData[0];

        // Display employee basic details
        let htmlContent = `
            <h3>Employee Details</h3>
            <table>
                <tr><th>Employee ID</th><td>${employee.employee_id}</td></tr>
                <tr><th>Employee Name</th><td>${employee.employee_name}</td></tr>
                <tr><th>Department</th><td>${employee.department}</td></tr>
                <tr><th>Position</th><td>${employee.position}</td></tr>
                <tr><th>Salary</th><td>${employee.salary}</td></tr>
                <tr><th>Joining Date</th><td>${employee.joining_date}</td></tr>
            </table>
        `;

        // Append employee details to the page
        employeeDetailsDiv.innerHTML += htmlContent;

        // Fetch and display related information from other tables like performance or attendance (optional)
        fetchRelatedData(employee.employee_id);
    }

    // Fetch related data for employee from other tables
    function fetchRelatedData(employeeId) {
        const queryPerformance = `SELECT * FROM performance WHERE employee_id = ${employeeId};`;
        const queryAttendance = `SELECT * FROM attendance WHERE employee_id = ${employeeId};`;

        // Perform two fetches: one for performance and another for attendance (if needed)
        Promise.all([
            fetch('/get-employee-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: queryPerformance })
            }),
            fetch('/get-employee-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: queryAttendance })
            })
        ])
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(([performanceData, attendanceData]) => {
            // Display performance data if available
            if (performanceData.length > 0) {
                displayPerformanceData(performanceData);
            }

            // Display attendance data if available
            if (attendanceData.length > 0) {
                displayAttendanceData(attendanceData);
            }
        })
        .catch(err => {
            console.error('Error fetching related data:', err);
            alert("An error occurred while fetching related data.");
        });
    }

    // Function to display performance data
    function displayPerformanceData(performanceData) {
        let performanceHTML = `
            <h3>Performance Details</h3>
            <table>
                <tr><th>Employee ID</th><th>Rating</th><th>Review</th><th>Evaluation Date</th></tr>
        `;

        performanceData.forEach(performance => {
            performanceHTML += `
                <tr>
                    <td>${performance.employee_id}</td>
                    <td>${performance.rating}</td>
                    <td>${performance.review}</td>
                    <td>${performance.evaluation_date}</td>
                </tr>
            `;
        });

        performanceHTML += '</table>';
        employeeDetailsDiv.innerHTML += performanceHTML;
    }

    // Function to display attendance data
    function displayAttendanceData(attendanceData) {
        let attendanceHTML = `
            <h3>Attendance Details</h3>
            <table>
                <tr><th>Employee ID</th><th>Attendance Date</th><th>Status</th></tr>
        `;

        attendanceData.forEach(attendance => {
            attendanceHTML += `
                <tr>
                    <td>${attendance.employee_id}</td>
                    <td>${attendance.attendance_date}</td>
                    <td>${attendance.status}</td>
                </tr>
            `;
        });

        attendanceHTML += '</table>';
        employeeDetailsDiv.innerHTML += attendanceHTML;
    }
});
