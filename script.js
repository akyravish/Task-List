// jshint esversion: 6
// Define UI Var
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//  checking Tasks list in local storage;

const checkLS = () => {
	let tasks;
	// if local storage is empty put tasks to empty array
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		// if there is value in localStorage then set it to tasks
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	return tasks;
};

// * Creating New Element

const newElement = () => {
	const li = document.createElement('li');
	// Create li class
	li.className = 'collection-item';
	// create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));

	// Create new link Element
	const link = document.createElement('a');
	// Add class to link
	link.className = 'delete-item secondary-content';
	// Add icon html
	link.innerHTML = '<i class="far fa-times-circle"></i>';

	// Append the link to the li element
	li.appendChild(link);
	// Append li Element to the ul element
	taskList.appendChild(li);
};

// Store in local storage function
const storeInLocalStorage = (task) => {
	const tasks = checkLS();
	// Set the task value to tasks in local storage
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
};

//  Get task from the local storage to show on list
const getTask = () => {
	const tasks = checkLS();
	tasks.forEach((task) => {
		const li = document.createElement('li');
		// Create li class
		li.className = 'collection-item';
		// create text node and append to li
		li.appendChild(document.createTextNode(task));

		// Create new link Element
		const link = document.createElement('a');
		// Add class to link
		link.className = 'delete-item secondary-content';
		// Add icon html
		link.innerHTML = '<i class="far fa-times-circle"></i>';

		// Append the link to the li element
		li.appendChild(link);
		// Append li Element to the ul element
		taskList.appendChild(li);
	});
};

//  Add task function
const addTask = (e) => {
	if (taskInput.value === '') {
		alert('Add a task');
	} else {
		newElement();
		storeInLocalStorage(taskInput.value);

		// clear the Input
		taskInput.value = '';
		e.preventDefault();
	}
};

//  Remove the task from Local Storage

const removeTaskFromLS = (item) => {
	const tasks = checkLS();

	tasks.forEach((task, index) => {
		if (item.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
};

//  Remove Task Function

const removeTask = (e) => {
	if (e.target.parentElement.classList.contains('delete-item')) {
		// remove the whole li element
		e.target.parentElement.parentElement.remove();
	}

	removeTaskFromLS(e.target.parentElement.parentElement);
};

//  Clear Tasks from Local Storage

const clearTasksFromLS = () => {
	localStorage.clear();
};

//  Clear Tasks Function

const clearTasks = () => {
	//  Clear First child until there is no child
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	clearTasksFromLS();
};

//  Filter Tasks Function

const filterTask = (e) => {
	// Get the text value from input
	const text = e.target.value.toLowerCase();
	// Get all the li element
	document.querySelectorAll('.collection-item').forEach((task) => {
		// Show the text content of li Elements
		const item = task.firstChild.textContent;
		// If the given text is in item it will show, otherwise it will not
		if (item.toLowerCase().indexOf(text) !== -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
};

const loadEventListeners = () => {
	// Calling DOM Event
	document.addEventListener('DOMContentLoaded', getTask);
	// Add task Event
	form.addEventListener('submit', addTask);
	// Remove task Event
	taskList.addEventListener('click', removeTask);
	// Clear task Event
	clearBtn.addEventListener('click', clearTasks);
	// Filter task Event
	filter.addEventListener('keyup', filterTask);
};

// Load all Event Listner
loadEventListeners();
