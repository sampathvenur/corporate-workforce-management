// Add.js

document.addEventListener('DOMContentLoaded', function () {
    const employeeForm = document.getElementById('employee-form');
    const salaryForm = document.getElementById('salary-form');
    const projectForm = document.getElementById('project-form');

    // Handle Employee Form Submission
    employeeForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const empId = document.getElementById('emp-id').value;
        const empName = document.getElementById('emp-name').value;
        const empGender = document.getElementById('emp-gender').value;
        const empDob = document.getElementById('emp-dob').value;
        const empDepartment = document.getElementById('emp-department').value;

        const employeeData = {
            emp_id: empId,
            emp_name: empName,
            emp_gender: empGender,
            emp_dob: empDob,
            emp_department: empDepartment
        };

        fetch('/addEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add employee');
        });
    });

    // Handle Salary Form Submission
    salaryForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const salaryAmount = document.getElementById('salary-amount').value;
        const paymentDate = document.getElementById('payment-date').value;
        const salaryEmpId = document.getElementById('salary-emp-id').value;

        const salaryData = {
            salary_amount: salaryAmount,
            payment_date: paymentDate,
            emp_id: salaryEmpId
        };

        fetch('/addSalary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(salaryData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add salary');
        });
    });

    // Handle Project Form Submission
    projectForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const projectId = document.getElementById('project-id').value;
        const projectName = document.getElementById('project-name').value;
        const empProjectId = document.getElementById('emp-project-id').value;

        const projectData = {
            project_id: projectId,
            project_name: projectName,
            emp_id: empProjectId
        };

        fetch('/addProject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add project');
        });
    });

    // Populate Department Dropdown Dynamically
    fetch('/getDepartments')
        .then(response => response.json())
        .then(data => {
            const departmentSelect = document.getElementById('emp-department');
            data.forEach(department => {
                const option = document.createElement('option');
                option.value = department.department_id;
                option.textContent = department.department_name;
                departmentSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to load departments');
        });
});
