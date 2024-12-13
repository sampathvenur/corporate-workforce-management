// Event listener for "Show Employee Details" button
document.getElementById('showDetailsBtn').addEventListener('click', () => {
    fetch('http://localhost:3000/show-details')
      .then(response => response.json())
      .then(data => {
        // Handle the data (show in the #employeeDetails div)
        const detailsDiv = document.getElementById('employeeDetails');
        detailsDiv.innerHTML = ''; // Clear previous data
  
        if (data.length > 0) {
          data.forEach(employee => {
            const employeeInfo = document.createElement('p');
            employeeInfo.textContent = `ID: ${employee.id}, Name: ${employee.name}, Department: ${employee.department}`;
            detailsDiv.appendChild(employeeInfo);
          });
          detailsDiv.style.display = 'block'; // Show the details
        } else {
          detailsDiv.innerHTML = '<p>No employee data found.</p>';
          detailsDiv.style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Error fetching employee details:', error);
      });
  });
  