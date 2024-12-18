const tableSelect = document.getElementById('tableSelect');
const showTableButton = document.getElementById('showTableButton');
const dataTable = document.getElementById('dataTable');

showTableButton.addEventListener('click', async () => {
    const tableName = tableSelect.value;

    try {
        const response = await fetch(`/getTableData?table=${tableName}`);
        const data = await response.json();

        // Create table dynamically
        dataTable.innerHTML = ''; // Clear previous table

        const table = document.createElement('table');
        const headerRow = table.insertRow();

        // Create header row
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

        dataTable.appendChild(table);
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching data');
    }
});