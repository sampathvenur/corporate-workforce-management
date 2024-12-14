const tableSelect = document.getElementById('tableSelect');
const form = document.getElementById('addForm');

tableSelect.addEventListener('change', () => {
    const selectedTable = tableSelect.value;
    form.innerHTML = ''; // Clear existing form fields

    // Define field definitions for each table
    const fieldDefinitions = {
        employee: [
            { label: 'EID', type: 'number', required: true },
            { label: 'Name', type: 'text', required: true },
            { label: 'Address', type: 'text' },
            { label: 'Gender', type: 'select', options: ['M', 'F'] },
            { label: 'Salary', type: 'number' },
            { label: 'Super EID', type: 'number' },
            { label: 'DNO', type: 'number' }
        ],
        department: [
            { label: 'DNUM', type: 'number', required: true },
            { label: 'DNAME', type: 'text', required: true },
            { label: 'DMGR_ID', type: 'number' },
            { label: 'MGR_START_DATE', type: 'date' }
        ],
        dlocation: [
            { label: 'DNO', type: 'number', required: true },
            { label: 'LOCATION', type: 'text', required: true }
        ],
        project: [
            { label: 'PNUM', type: 'number', required: true },
            { label: 'PNAME', type: 'text', required: true },
            { label: 'PLOCATION', type: 'text' },
            { label: 'DNO', type: 'number' }
        ],
        workson: [
            { label: 'EID', type: 'number', required: true },
            { label: 'PNO', type: 'number', required: true },
            { label: 'HOURS', type: 'number' }
        ],
        dependent: [
            { label: 'EMP_ID', type: 'number', required: true },
            { label: 'DEPENDENT_NAME', type: 'text', required: true },
            { label: 'GENDER', type: 'text' },
            { label: 'BDATE', type: 'date' },
            { label: 'RELATIONSHIP', type: 'text' }
        ]
    };

    // Generate form fields based on the selected table
    const fields = fieldDefinitions[selectedTable];
    fields.forEach(field => {
        const label = document.createElement('label');
        label.htmlFor = field.label;
        label.textContent = `${field.label}: `;

        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.label;
        input.name = field.label;
        if (field.required) {
            input.required = true;
        }

        if (field.type === 'select') {
            const select = document.createElement('select');
            field.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                select.appendChild(optionElement);
            });
            input.appendChild(select);
        }

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement('br'));
    });

    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('button'));
    form.lastChild.type = 'submit';
    form.lastChild.textContent = 'Submit';
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/addData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table: tableSelect.value,
                data: data
            })
        });

        if (response.ok) {
            alert('Data added successfully!');
            // Optionally redirect to a success page
        } else {
            alert('Error adding data');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
});