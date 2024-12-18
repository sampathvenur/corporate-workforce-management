const addButton = document.getElementById('addButton');
const showTableButton = document.getElementById('showTableButton');
const customQueryButton = document.getElementById('customQueryButton');

addButton.addEventListener('click', () => {
    window.location.href = 'add.html';
});

showTableButton.addEventListener('click', () => {
    window.location.href = 'show.html';
});

customQueryButton.addEventListener('click', () => {
    window.location.href = 'custom.html';
});