
// находим элементы на странице 
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.forEach(task => renderTask(task));
}

checkEmptyList();

// добавдение задачи
form.addEventListener('submit',addTask)

// удаление задачи
tasksList.addEventListener('click', deleteTask);

// отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask)

// if (localStorage.getItem('tasksHTML')) {
//   tasksList.innerHTML = localStorage.getItem('tasksHTML')
// }

function addTask(event){ 
  event.preventDefault()

  // dostauom text iz input
  const taskText = taskInput.value

  // описываем задачу в виде обьекта
  const newTask = {
    id: Date.now(), 
    text: taskText,
    done: false,
  };

  // добавляем задачу в массив с задачами
  tasks.push(newTask)

  saveLocalStorage()

  renderTask(newTask)

  // очищаем поле ввода и возвращаем фокус на него
  taskInput.value = '';
  taskInput.focus();
  
  
  // убираем 'список дел пуст' если добавили задачу (проверка)
  // if (tasksList.children.length > 1) {
  //   emptyList.classList.add('none')
  // }

  // saveHTMLtoLS()

  checkEmptyList()
}

function deleteTask(event) {
  //  проверяем что клик был по кнопке удалить задачу
  if (event.target.dataset.action === 'delete') {
    // console.log('delete');
    const parenNode = event.target.closest('.list-group-item');

    // определяем ID задачи
    const id = Number(parenNode.id);

    // находим индекс задачи в массиве 
    /*
    const index = tasks.findIndex((value) => value.id === id)

    // удаляем задачу из массива 
    tasks.splice(index, 1)
    */

    // удаляем задачу через фильтрацию массива
    tasks = tasks.filter(value => value.id !== id)

    parenNode.remove()
  }

  saveLocalStorage()

  // проверка 
  // if (tasksList.children.length === 1) {
  //   emptyList.classList.remove('none')
  // }

  // saveHTMLtoLS()

  checkEmptyList()

}

function doneTask(event) {
  //  проверяем что клик был по кнопке выполнить задачу
  if (event.target.dataset.action === 'done') {

    const parenNode = event.target.closest('.list-group-item');

    // определяем ID задачи
    const id =  Number(parenNode.id)

    const task = tasks.find(value => value.id === id)
    console.log(task);

    task.done = !task.done;

    saveLocalStorage()

    const taskTitle = parenNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done')

  }
  
  // saveHTMLtoLS()

}

function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListHTML = 
    `
    <li id="emptyList" class="list-group-item empty-list">
      <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
      <div class="empty-list__title">Список дел пуст</div>
    </li>
    `;
    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML)
  }

  if (tasks.length > 0) {
    const emptyListEl = document.querySelector('#emptyList');
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));

}

function renderTask(task) {
    // Формируем css класс
    const cssClass = task.done ? "task-title task-title--done" : "task-title";
 
    // Формируем разметку для новой задачи
    const taskHTML = 
    `
    <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
      <span class="${cssClass}">${task.text}</span>
      <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
          <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
          <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
      </div>
    </li>
    `;
  
    //  добавляем разсетку на страницу 
    tasksList.insertAdjacentHTML('beforeend', taskHTML)
}

// function saveHTMLtoLS() {
//   localStorage.setItem('tasksHTML', tasksList.innerHTML)
// }

