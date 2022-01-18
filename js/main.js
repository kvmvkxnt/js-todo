var elForm = document.querySelector('.todo__form');
var elInput = document.querySelector('.todo__input');
var elList = document.querySelector('.todo__list');
var clearButton = document.querySelector('.todo__clear');
var tasksLeft = document.querySelector('.todo__left');
var taskFilter = document.querySelector('.todo__filter');
var elDeleteTask = document.querySelectorAll('.todo__button');
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

        var elDeleteTask = document.querySelectorAll('.todo__button');
        for (var i = 0; i < elDeleteTask.length; i++) {
            elDeleteTask[i].addEventListener('click', function() {
                var task = document.getElementsByTagName('li');
                task[i].remove();
            });
        }

        var taskLabels = document.querySelectorAll('.todo__label');

        for (var i = 0; i < taskLabels.length; i++) {
            taskLabels[i].addEventListener('click', function(){
                var label = this.parentElement;
                label.classList.toggle('checked');
            })
        }
    }
}

for (var i = 0; i < elDeleteTask.length; i++) {
    elDeleteTask[i].addEventListener('click', function() {
        var task = document.getElementsByTagName('li');
        task[i].remove();
    })
}

var taskLabels = document.querySelectorAll('.todo__label');

for (var i = 0; i < taskLabels.length; i++) {
    taskLabels[i].addEventListener('click', function(){
        var label = this.parentElement;
        label.classList.toggle('checked');
    })
}