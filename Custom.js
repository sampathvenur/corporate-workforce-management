const queryInput = document.getElementById('queryInput');
const executeQueryButton = document.getElementById('executeQueryButton');
const queryResultTable = document.getElementById('queryResultTable');

executeQueryButton.addEventListener('click', async () => {
    const query = queryInput.value;

    try {
        const response = await fetch('/executeQuery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query })
        });

        const data = await response.json();

        // Create table dynamically (similar to show.js)
        queryResultTable.innerHTML = ''; 

        if (data.length > 0) {
            const table = document.createElement('table');
            const headerRow = table.insertRow();

            // Create header row based on the first row of data
            for (const key in data[0]) {
                const th = document.createElement('th');
                th.textContent = key;
                headerRow.appendChild(th);
            }

            // Create data rows
            data.forEach(row => {
                const rowElement = table.insertRow();
                for (const key in row) {
                    const cell = rowElement.insertCell();
                    cell.textContent = row[key];
                }
            });

            queryResultTable.appendChild(table);
        } else {
            queryResultTable.textContent = 'No results found.';
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Error executing query');
    }
});