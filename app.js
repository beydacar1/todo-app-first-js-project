const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos ");
const textList = document.querySelectorAll(".todoText")

eventListeners();

function eventListeners() {
	form.addEventListener("submit", addTodo);
	document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
	secondCardBody.addEventListener("click", deleteTodo);
	filter.addEventListener("keyup", filterTodos);
	clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e) {
	if (confirm("Tümünü silmek istediğinize emin misiniz ?")) {
		while (todoList.firstElementChild != null) {
			todoList.removeChild(todoList.firstElementChild);
		}
		localStorage.removeItem("todos");
	}
}
function filterTodos(e) {
	const filterValue = e.target.value.toLowerCase(); // beyda
	const listItems = document.querySelectorAll(".list-group-item");

	listItems.forEach(function (listItem) {
		const text = listItem.textContent.toLowerCase(); // berat bozkurt
		if (text.indexOf(filterValue) === -1) {
			listItem.setAttribute("style", "display : none !important")
		} else {
			listItem.setAttribute("style", "display : block")
		}
	});
}


function deleteTodo(e) {
	const liItem = e.target.parentElement.parentElement;
	if (e.target.className === "fa fa-remove") {
		e.target.parentElement.parentElement.parentElement.remove();
		deleteTodoFromStorage(e.target.parentElement.parentElement.parentElement.textContent);
		showAlert("success", "Todo başarıyla silindi.");
	}
	if (e.target.className === "form-check-input mr-2") {
		if (!liItem.classList.contains("textDecoration")) {
			liItem.classList.remove('textDecoration');
		} else {
			liItem.classList.add('textDecoration');
		}

	}




}
function deleteTodoFromStorage(deletetodo) {
	let todos = getTodosfromStorage();
	todos.forEach(function (todo, index) {
		if (todo === deletetodo) {
			todos.splice(index, 1);
		}
	});
	localStorage.setItem("todos", JSON.stringify(todos));
}
function loadAllTodosToUI() {
	let todos = getTodosfromStorage();
	todos.forEach(function (todo) {
		addTodoToUI(todo);
	});
}
function addTodo(e) {
	console.log(e)
	const newTodo = todoInput.value.trim();

	if (newTodo === "") {

		showAlert("danger", "Lütfen bir todo girin...");
	} else {

		addTodoToUI(newTodo);
		addTodoToStorage(newTodo);
		showAlert("success", "Todo oluşturuldu.")

	}



	e.preventDefault();
}
function getTodosfromStorage() {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	}
	else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	return todos;
}
function addTodoToStorage(newTodo) {
	let todos = getTodosfromStorage();
	todos.push(newTodo);
	localStorage.setItem("todos", JSON.stringify(todos));
}
function showAlert(type, message) {
	const alert = document.createElement("div");
	alert.className = `alert alert-${type}`;
	alert.textContent = message;
	firstCardBody.appendChild(alert);
	setTimeout(function () {
		alert.remove();
	}, 1000);
}
function addTodoToUI(newTodo) {
	const listItem = document.createElement("li");
	const link = document.createElement("a");
	const edit = document.createElement("input");
	const divv = document.createElement("div");
	const text = document.createElement("span");
	text.className = "todoText ";
	divv.className = "d-flex";
	edit.id = "exampleCheck1";
	edit.className = "form-check-input mr-2";
	edit.type = "checkbox";
	edit.title = "Edit";
	link.href = "# ";
	link.className = "delete-item"
	link.innerHTML = "<i class = 'fa fa-remove'></i>";
	listItem.className = "list-group-item d-flex justify-content-between"
	text.appendChild(document.createTextNode(newTodo))
	divv.appendChild(edit);
	divv.appendChild(link);
	listItem.appendChild(text);
	listItem.appendChild(divv);
	todoList.appendChild(listItem);
	todoInput.value = "";
}