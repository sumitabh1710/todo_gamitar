// Sample data
let todos = [
  {
    title: "Complete project proposal",
    description:
      "Write the proposal for the upcoming project. lets complete this. then we will move ahead.",
    endDate: "2024-03-25",
    priority: "high",
    status: "todo",
  },
  {
    title: "Prepare presentation slides",
    description: "Create slides for the project presentation",
    endDate: "2024-04-01",
    priority: "medium",
    status: "todo",
  },
];

document
  .getElementById("add-todo-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    console.log(formData);

    const todo = {};
    formData.forEach((value, key) => {
      todo[key] = value;
    });

    todo.status = "todo";

    todos.push(todo);
    displayTodos();

    this.reset();
  });

// Functions to manage todos
function addTodo() {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const endDate = document.getElementById("endDate").value;
  const priority = document.getElementById("priority").value;

  const todo = { title, description, endDate, priority, status: "todo" };
  todos.push(todo);
  displayTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  displayTodos();
}

function updateStatus(index, status) {
  todos[index].status = status;
  displayTodos();
}

// Function to display todos based on status
function displayTodos(status = "todo", priority = "all", endDate = "") {
  const todoTableBody = document.getElementById("todo-table-body");
  todoTableBody.innerHTML = "";

  const filtered_todos = todos.filter((each) => {
    if (priority != "all") {
      return each.priority == priority;
    } else {
      return true;
    }
  });

  const date_filtered_todos = filtered_todos.filter((each) => {
    if (endDate.length != 0) {
      return each.endDate == endDate;
    } else {
      return true;
    }
  });

  date_filtered_todos.forEach((todo, index) => {
    if (todo.status === status) {
      const row = todoTableBody.insertRow();
      row.innerHTML = `
                  <td>${todo.title}</td>
                  <td class="table-description">${todo.description}</td>
                  <td>${todo.endDate}</td>
                  <td>${todo.priority}</td>
                  <td class="table-buttons">
                      <button class="delete-btn small-btn">Delete</button>
                      <button class="start-btn small-btn">Start</button>
                      <button class="complete-btn small-btn">Complete</button>
                  </td>
              `;
      row
        .querySelector(".delete-btn")
        .addEventListener("click", () => deleteTodo(index));
      row
        .querySelector(".start-btn")
        .addEventListener("click", () => updateStatus(index, "doing"));
      row
        .querySelector(".complete-btn")
        .addEventListener("click", () => updateStatus(index, "done"));
    }
  });
}

function switchStatus(status) {
  displayTodos(status);
  const smallBtns = document.querySelectorAll(".small-btn");
  smallBtns.forEach((btn) => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  });
  const filter_btn = document.getElementById(`${status}-btn`);
  filter_btn.className += " active";
}

const priorityFilterSelect = document.getElementById("priority-filter");
priorityFilterSelect.addEventListener("change", function () {
  const selectedValue = this.value;
  displayTodos("todo", selectedValue);
  const smallBtns = document.querySelectorAll(".small-btn");
  smallBtns.forEach((btn) => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  });
  const filter_btn = document.getElementById(`todo-btn`);
  filter_btn.className += " active";
});

const dateFilterSelect = document.getElementById("date-filter");
dateFilterSelect.addEventListener("change", function () {
  const selectedValue = this.value;
  console.log(selectedValue);
  displayTodos("todo", "all", selectedValue);
  const smallBtns = document.querySelectorAll(".small-btn");
  smallBtns.forEach((btn) => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  });
  const filter_btn = document.getElementById(`todo-btn`);
  filter_btn.className += " active";
});

displayTodos();
