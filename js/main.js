var elForm = document.querySelector('.todo__form');
var elInput = document.querySelector('.todo__input');
var elList = document.querySelector('.todo__list');
var clearButton = document.querySelector('.todo__clear');
var tasksLeft = document.querySelector('.todo__left');
var taskFilter = document.querySelector('.todo__filter');
var checked = 0;
var unchecked = 0;
var uncompletedTasks = [];

elForm.addEventListener('submit', handleFormSubmitter);

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
    else { // creating new element
        var newItem = document.createElement('li');
        newItem.className = 'todo__item';
        newItem.setAttribute("onmouseover", "this.querySelector('.todo__button').style.visibility = 'visible'");
        newItem.setAttribute("onmouseout", "this.querySelector('.todo__button').style.visibility = 'hidden'");
        newItem.innerHTML = `<label class="todo__label"><input type="checkbox" class="todo__checkbox visually-hidden"><span class="todo__check"></span><p class="todo__task">${newTask}</p></label><button class="todo__button"><img src="../images/x.svg" alt="Check"></button>`;
        elList.appendChild(newItem);

        unchecked += 1;
    }

    function labelFunc(elem) {
        var labelTask = elem.parentElement;
        labelTask.classList.toggle('checked');
        var tasks = document.querySelectorAll('.todo__item');

        for (var z = 0; z < tasks.length; i++) {
            var taskClass = tasks[z].className.split(' ');
            checked = 0;

            if (taskClass.includes('checked')) {
                checked += 1;
                unchecked -= 1;
            }
        }
    }

    var labels = document.querySelectorAll('.todo__label');
    console.log(labels);
    for (var i = 0; i < labels.length; i++) {
        labels[i].addEventListener('click', function() {
            labelFunc(this);
        })
    }

    var tasks = document.querySelectorAll('.todo__item');
    if (tasks.length > 0) {
        taskFilter.style.display = 'flex';
    } else {
        taskFilter.style.display = 'none';
    }

    var elDeleteTask = document.querySelectorAll('.todo__button');
    for (var i = 0; i < elDeleteTask.length; i++) {
        elDeleteTask[i].addEventListener('click', function() {
            this.parentElement.remove();

            var tasks = document.querySelectorAll('.todo__item');
            if (tasks.length > 0) {
                taskFilter.style.display = 'flex';
            } else {
                taskFilter.style.display = 'none';
            }
        })
    }
}