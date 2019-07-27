const addBtn = document.getElementById('add');
const ulTasks = document.getElementById('todoListTasks');
const inputText = document.querySelector('.message-task');

let listTasks = [];

if(localStorage.getItem('listTasks')) {
    listTasks = JSON.parse(localStorage.getItem('listTasks'));
    displayTasks();
}

addBtn.addEventListener('click', () => {

    if(!inputText.value) return;

    const newTask = {
        textTask: inputText.value,
        important: false,
        checked: false
    };

    listTasks.push(newTask);
    displayTasks();
    localStorage.setItem('listTasks', JSON.stringify(listTasks));
    inputText.value = '';
});

function displayTasks() {

    let markupLi = '';

    listTasks.forEach((item, idx) => {
        markupLi += `
            <li>
                <input type="checkbox" id="item-${idx}" ${item.checked ? "checked" : ""} />
                <label for="item-${idx}" class="${item.important ? 'important' : ''}">${item.textTask}</label>
            </li>
        `;
    });

    ulTasks.innerHTML = markupLi;
}

ulTasks.addEventListener('change', event => {
    const inputId = event.target.getAttribute('id');
    const textLabel = ulTasks.querySelector('[for=' + inputId + ']').innerHTML;

    listTasks.forEach(item => {
        if(item.textTask === textLabel) {
            item.checked = !item.checked;
            localStorage.setItem('listTasks', JSON.stringify(listTasks));
        }
    });
});

ulTasks.addEventListener('contextmenu', event => {
    event.preventDefault();

    listTasks.forEach((item, idx) => {
        if(item.textTask === event.target.innerHTML) {
            if(event.ctrlKey) {
                listTasks.splice(idx, 1);
            } else {
                item.important = !item.important;
            }
            displayTasks();
            localStorage.setItem('listTasks', JSON.stringify(listTasks));
        }
    });
});
