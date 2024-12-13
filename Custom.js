document.addEventListener('DOMContentLoaded', function() {
    const queryInput = document.getElementById('custom-query');
    const executeButton = document.getElementById('execute-query-btn');
    const resultContainer = document.getElementById('query-result');
    const resultTable = document.getElementById('query-result-table');
    
    // Event listener for Execute Query button
    executeButton.addEventListener('click', function() {
        const query = queryInput.value.trim();
        
        // Check if query is empty
        if (!query) {
            alert('Please enter a SQL query');
            return;
        }

        // Prevent dangerous queries (DROP, DELETE, etc.)
        if (checkForDangerousQueries(query)) {
            alert('Error: Unsafe query detected. You cannot run DROP, DELETE, or ALTER queries.');
            return;
        }

        // Show loading indication (optional, can be customized further)
        executeButton.disabled = true;
        executeButton.innerText = 'Executing...';

        // Perform AJAX request to backend to execute the query
        fetch('/execute-custom-query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query })
        })
        .then(response => response.json())
        .then(data => {
            executeButton.disabled = false;
            executeButton.innerText = 'Execute Query';
            
            // Clear previous results
            resultContainer.style.display = 'block';
            resultTable.innerHTML = '';

            // Check if there is an error or results
            if (data.error) {
                displayError(data.error);
            } else if (data.result) {
                displayResults(data.result);
            } else {
                displayError('No result returned');
            }
        })
        .catch(error => {
            executeButton.disabled = false;
            executeButton.innerText = 'Execute Query';
            alert('Error executing the query: ' + error);
        });
    });

    // Function to check for dangerous SQL queries (e.g., DROP, DELETE)
    function checkForDangerousQueries(query) {
        const dangerousKeywords = ['DROP', 'DELETE', 'ALTER', 'TRUNCATE', 'UPDATE'];
        return dangerousKeywords.some(keyword => query.toUpperCase().includes(keyword));
    }

    // Function to display error messages
    function displayError(message) {
        resultTable.innerHTML = `<tr><td colspan="2" style="color: red;">${message}</td></tr>`;
    }

    // Function to display query results in a table
    function displayResults(results) {
        const headers = Object.keys(results[0]);
        const headerRow = document.createElement('tr');
        
        // Create table headers dynamically
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        resultTable.appendChild(headerRow);

        // Create table rows for results
        results.forEach(row => {
            const tr = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = row[header] || 'N/A';
                tr.appendChild(td);
            });
            resultTable.appendChild(tr);
        });
    }
});
