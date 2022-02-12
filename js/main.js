const elForm = findElement('.todo__form');
const elInput = findElement('.todo__input');
const elList = findElement('.todo__list');
const clearButton = findElement('.todo__clear');
const tasksLeft = findElement('.todo__left');
const taskFilter = findElement('.todo__filter');
const allTasksFilter = findElement('#todo_all');
const activeTasksFilter = findElement('#todo_active');
const elCompleteAll = findElement('.todo__arrow');
const completedTasksFilter = findElement('#todo_completed');
const elTodoTemplate = findElement('.todo-template').content;

let todos = JSON.parse(window.localStorage.getItem('todos')) || [];

const handleAddTodo = (evt) => {
    evt.preventDefault();
    const todoValue = elInput.value.trim();
    if (todoValue == null) {
        return;
    } else {
        const newTodo = {
            id: todos[todos.length - 1]?.id + 1 || 0,
            title: todoValue,
            isCompleted: false,
        }

        todos.push(newTodo);
        renderTodos(todos);
        window.localStorage.setItem('todos', JSON.stringify(todos));
        elInput.value = null;
    }

    viewFilters(todos);
    itemsLeft(todos);
}

const viewFilters = (arr) => {
    if (arr.length > 0) {
        taskFilter.style.display = 'flex';
        elCompleteAll.style.display = 'block';
    } else if (arr.length <= 0) {
        taskFilter.style.display = 'none';
        elCompleteAll.style.display = 'none';
    }

    let completed = 0;
    arr.forEach((item) => {
        if (item.isCompleted) {
            completed += 1;
        };
    });
    if (completed > 0) {
        clearButton.style.visibility = 'visible';
    } else {
        clearButton.style.visibility = 'hidden';
    }
}

const handleDeleteTodo = (id, arr) => {
    const todoIndex = arr.findIndex((item) => item.id === id);

    arr.splice(todoIndex, 1);

    renderTodos(arr);
    window.localStorage.setItem('todos', JSON.stringify(arr));
    viewFilters(arr);
    itemsLeft(arr);
}

const handleCheckTodo = (id, arr) => {
    const todo = arr.find((elem) => elem.id === id);

    todo.isCompleted = !todo.isCompleted;

    renderTodos(arr);
    window.localStorage.setItem('todos', JSON.stringify(arr));
    viewFilters(arr);
    itemsLeft(arr);
}

const itemsLeft = (arr) => {
    let counter = 0;
    arr.forEach((item) => {
        if (!item.isCompleted) {
            counter+=1;
        }
    });

    tasksLeft.textContent = counter + ' items left';
}

const handleCheckAll = () => {
    todos.forEach((item) => {
        item.isCompleted = true;
    });

    renderTodos(todos);
    window.localStorage.setItem('todos', JSON.stringify(todos));
    viewFilters(todos);
    itemsLeft(todos);
}

const handleList = (evt) => {
    const todoId = Number(evt.target.dataset.todoId);
    const target = evt.target;

    if (target.matches('.todo__button')) {
        handleDeleteTodo(todoId, todos);
    } else if (target.matches('.todo__checkbox')) {
        handleCheckTodo(todoId, todos);
    } else if (target.matches('.todo__task')) {
        handleEditTodo(todoId, todos);
    }
}

const handleClearCompleted = (arr) => {
    arr.forEach((item) => {
        if (item.isCompleted) {
            const foundIndex = arr.findIndex((elem) => elem.id === item.id);
            arr.splice(foundIndex, 1);
        }

        renderTodos(arr);
    });

    window.localStorage.setItem('todos', JSON.stringify(todos));
    viewFilters(arr);
    itemsLeft(arr);
}

const handleFilter = (evt) => {
    const clicked = evt.target;
    if (clicked.matches('.todo__clear')) {
        handleClearCompleted(todos);
    } else if (clicked.matches('#todo_all')) {
        activeTasksFilter.style.border = '1px solid transparent';
        completedTasksFilter.style.border = '1px solid transparent';
        clicked.style.border = '1px solid orange';
        renderTodos(todos);
    } else if (clicked.matches('#todo_completed')) {
        activeTasksFilter.style.border = '1px solid transparent';
        allTasksFilter.style.border = '1px solid transparent';
        clicked.style.border = '1px solid orange';
        const completed = [];
        todos.forEach((item) => {
            if (item.isCompleted) {
                completed.push(item);
            }
        })

        renderTodos(completed); 

    } else if (evt.target.matches('#todo_active')) {
        allTasksFilter.style.border = '1px solid transparent';
        completedTasksFilter.style.border = '1px solid transparent';
        evt.target.style.border = '1px solid orange';
        const active = [];
        todos.forEach((item) => {
            if (item.isCompleted == false) {
                active.push(item);
            }
        });

        renderTodos(active);
    }
}

const renderTodos = (todos) => {
    elList.innerHTML = null;

    const todoFragment = document.createDocumentFragment();

    todos.forEach((item) => {
        const todo = elTodoTemplate.cloneNode(true);

        const todoTask = findElement('.todo__task', todo);
        const todoCheck = findElement('.todo__checkbox', todo);
        const todoDelete = findElement('.todo__button', todo);

        todoTask.textContent = item.title;
        todoDelete.dataset.todoId = item.id;
        todoTask.dataset.todoId = item.id;
        todoDelete.parentNode.dataset.todoId = item.id;
        todoCheck.dataset.todoId = item.id;
        
        if (item.isCompleted) {
            todoCheck.checked = true;
            todoTask.style.textDecoration = 'line-through';
            todoTask.style.opacity = '0.5';
        } else {
            todoCheck.checked = false;
            todoTask.style.textDecoration = 'none';
            todoTask.style.opacity = '1';
        }

        todoFragment.appendChild(todo);
    })

    elList.appendChild(todoFragment);
}

elForm.addEventListener('submit', handleAddTodo);
elList.addEventListener('click', handleList);
elCompleteAll.addEventListener('click', handleCheckAll);
taskFilter.addEventListener('click', handleFilter);

renderTodos(todos);
viewFilters(todos);
itemsLeft(todos);