// jshint esversion: 6
// Define UI Var
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//  Add task function
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

//  Remove Task Function

const removeTask = (e) => {
	if (e.target.parentElement.classList.contains('delete-item')) {
		// remove the whole li element
		e.target.parentElement.parentElement.remove();
	}
};

//  Clear Tasks Function

const clearTasks = () => {
	//  Clear First child until there is no child
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
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
