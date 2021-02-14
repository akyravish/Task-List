// jshint esversion: 6
// Define UI Var
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Add task function
const addTask = (e) => {
	if (taskInput.value === '') {
		alert('Add a task');
	}

	// Create <li> Element
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

	// clear the Input
	taskInput.value = '';
	e.preventDefault();
};

const loadEventListeners = () => {
	// Add task Event
	form.addEventListener('submit', addTask);
};

// Load all Event Listner
loadEventListeners();
