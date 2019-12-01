const getTodos = function() {
  const todosJson = localStorage.getItem("todos");
  const todos = todosJson !== null ? JSON.parse(todosJson) : [];
  return todos;
};

// save todos
const saveTodos = function(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const completeTodo = () => {
  const items = document.getElementsByClassName("todo-item");
  for (let i = 0; i < items.length; i++) {
    items[i].onclick = function() {
      const todo = todos.find(todo => {
        //not a best practice, but okay wkw
        return todo.text == this.textContent;
      });
      todo.completed = !todo.completed;
      this.classList.toggle("checked");
      saveTodos(todos);
      renderTodos(todos, filters);
    };
  }
};
completeTodo();
// render todos
const renderTodos = function(todos, filters) {
  const filterTodos = todos.filter(function(todo) {
    const searchText = todo.text
      .toLocaleLowerCase()
      .includes(filters.searchText.toLocaleLowerCase());
    const hideCompleted = !filters.hideCompleted || !todo.completed;

    return searchText && hideCompleted;
  });

  const incompletedTodos = filterTodos.filter(function(todo) {
    return !todo.completed;
  });

  document.querySelector("#todos").innerHTML = "";

  filterTodos.forEach(function(todo) {
    document.querySelector("#todos").appendChild(generateTodo(todo));
  });
  const count = summaryTodo(incompletedTodos);
  completeTodo();
  document.getElementById("count").innerHTML =
    count == 0 ? "Wohoo.. you have nothing to-do" : count + " things todo";
};

// generate todo to DOM
const generateTodo = function(todo) {
  const p = document.createElement("p");
  p.textContent = todo.text;
  p.classList.add("todo-item");
  todo.completed && p.classList.add("checked");
  return p;
};

// summary todo
const summaryTodo = function(incompletedTodos) {
  //   const summary = document.createElement("h6");
  //   summary.textContent = `${incompletedTodos.length} `;

  return incompletedTodos.length;
};
