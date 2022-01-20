var elForm = document.querySelector('.todo__form');
var elInput = document.querySelector('.todo__input');
var elList = document.querySelector('.todo__list');
var clearButton = document.querySelector('.todo__clear');
var tasksLeft = document.querySelector('.todo__left');
var taskFilter = document.querySelector('.todo__filter');
var allTasksFilter = document.querySelector('#todo_all');
var activeTasksFilter = document.querySelector('#todo_active');
var completedTasksFilter = document.querySelector('#todo_completed');
var checked = 0;

elForm.addEventListener('submit', handleFormSubmitter);
clearButton.addEventListener('click', handleClear);
allTasksFilter.addEventListener('click', showAllTasks);
activeTasksFilter.addEventListener('click', showActiveTasks);
completedTasksFilter.addEventListener('click', showCompletedTasks);
allTasksFilter.style.borderColor = 'rgba(175, 47, 47, 0.2)';

function handleFormSubmitter(evt) {
    evt.preventDefault();
    createNewElement();
}

function createNewElement() {
    var newTask = elInput.value.trim();
    elInput.value = null;
    if (newTask.length <= 0) {
        null
    }
    else {
        var newItem = document.createElement('li');
        var newLabel = document.createElement('label');
        var newCheckbox = document.createElement('input');
        var newCheck = document.createElement('span');
        var newTaskDesc = document.createElement('p');
        var newButton = document.createElement('button');
        var newImg = document.createElement('img');

        newItem.setAttribute('class', 'todo__item');
        newItem.setAttribute("onmouseover", "this.querySelector('.todo__button').style.visibility = 'visible'");
        newItem.setAttribute("onmouseout", "this.querySelector('.todo__button').style.visibility = 'hidden'");
        newLabel.setAttribute('class', 'todo__label');
        newCheckbox.setAttribute('class', 'todo__checkbox visually-hidden');
        newCheckbox.setAttribute('type', 'checkbox');
        newCheck.setAttribute('class', 'todo__check');
        newTaskDesc.setAttribute('class', 'todo__task');
        newButton.setAttribute('class', 'todo__button');
        newImg.setAttribute('src', '../images/x.svg');
        newImg.setAttribute('alt', 'Check');

        newTaskDesc.textContent = newTask;

        newLabel.appendChild(newCheckbox);
        newLabel.appendChild(newCheck);
        newLabel.appendChild(newTaskDesc);
        newButton.appendChild(newImg);
        newItem.appendChild(newLabel)
        newItem.appendChild(newButton);
        elList.appendChild(newItem);

        filterFinder(newItem);

        newButton.addEventListener('click', function() {
            newItem.remove();
            toDoLeft();
            clearDisplay();
        });

        newCheckbox.addEventListener('change', function() {
            if (this.checked) {
                var checksItem = this.parentElement.parentElement;
                this.classList.add('checked');
                checked += 1;
                toDoLeft();
                clearDisplay();
                filterDisplay()
                var listClasses = elList.className.split(' ');
                if (listClasses.includes('only-active')) {
                    checksItem.style.display = 'none';
                } else if (listClasses.includes('only-completed')) {
                    checksItem.style.display = 'block';
                } else {
                    checksItem.style.display = 'block';
                }
                
            } else {
                var checksItem = this.parentElement.parentElement;
                this.classList.remove('checked');
                checked -= 1;
                toDoLeft();
                clearDisplay();
                filterFinder(checksItem);
                filterDisplay();
            }
        });
    }

    filterDisplay();
    toDoLeft();
    clearDisplay();
}

function toDoLeft() {
    var itemsLeft = document.querySelectorAll('.todo__checkbox').length - document.querySelectorAll('.checked').length;
    tasksLeft.textContent = itemsLeft + ' items left';
}

function filterDisplay() {
    var allItems = document.querySelectorAll('.todo__item');
    if (allItems.length > 0) {
        taskFilter.style.display = 'flex';
    } else {
        taskFilter.style.display = 'none';
    }
}

function clearDisplay() {
    var allChecked = document.querySelectorAll('.checked');

    if (allChecked.length > 0) {
        clearButton.style.visibility = 'visible';
    } else {
        clearButton.style.visibility = 'hidden';
    }
}

function handleClear() {
    var allChecked = document.querySelectorAll('.checked');

    for (var i = 0; i < allChecked.length; i++) {
        var checkedTask = allChecked[i].parentElement.parentElement;
        checkedTask.remove();
    }

    clearDisplay();
}

function showAllTasks() {
    allTasksFilter.style.borderColor = 'rgba(175, 47, 47, 0.2)';
    activeTasksFilter.style.borderColor = 'transparent';
    completedTasksFilter.style.borderColor = 'transparent';
    elList.className = 'todo__list';

    var allTasks = document.querySelectorAll('.todo__item');

    for (var i = 0; i < allTasks.length; i++) {
        allTasks[i].style.display = 'block';
    }
}

function showActiveTasks() {
    activeTasksFilter.style.borderColor = 'rgba(175, 47, 47, 0.2)';
    allTasksFilter.style.borderColor = 'transparent';
    completedTasksFilter.style.borderColor = 'transparent';
    elList.className = 'todo__list only-active';

    var allTasks = document.querySelectorAll('.todo__item');
    var completedChecks = document.querySelectorAll('.checked');

    for (var i = 0; i < allTasks.length; i++) {
        allTasks[i].style.display = 'block';
    }

    for (var z = 0; z < completedChecks.length; z++) {
        var completedTask = completedChecks[z].parentElement.parentElement;
        completedTask.style.display = 'none';
    }
}

function showCompletedTasks() {
    completedTasksFilter.style.borderColor = 'rgba(175, 47, 47, 0.2)';
    activeTasksFilter.style.borderColor = 'transparent';
    allTasksFilter.style.borderColor = 'transparent';
    elList.className = 'todo__list only-completed';

    var allTasks = document.querySelectorAll('.todo__item');
    var completedChecks = document.querySelectorAll('.checked');

    for (var i = 0; i < allTasks.length; i++) {
        allTasks[i].style.display = 'none';
    }

    for (var z = 0; z < completedChecks.length; z++) {
        var completedTask = completedChecks[z].parentElement.parentElement;
        completedTask.style.display = 'block';
    }
}

function filterFinder(checkItem) {
    var listClasses = elList.className.split(' ');
    if (listClasses.includes('only-active')) {
        checkItem.style.display = 'block';
    } else if (listClasses.includes('only-completed')) {
        checkItem.style.display = 'none';
    } else {
        checkItem.style.display = 'block';
    }
} 