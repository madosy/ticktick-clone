var pubsub = require("pubsub.js");

export const todoPanel = (() => {
  const render = (todos) => {
    const todoList = document.body.querySelector(".todo-list");
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const renderedItem = renderItem(todo);
      todoList.appendChild(renderedItem);
    });
  };

  const renderItem = ({ id, title, dueDate, priority, checked, details }) => {
    // todoObject {id, title, dueDate, priority, checked, details }
    const statusBox = document.createElement("input");
    statusBox.setAttribute("type", "checkbox");
    statusBox.checked = checked;
    const _title = document.createElement("p");
    _title.textContent = title;
    const _dueDate = document.createElement("span");
    _dueDate.textContent = dueDate; //Use date formatter here later
    const _details = document.createElement("p");
    _details.textContent = details;

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo");
    todoItem.dataset.id = id;

    todoItem.appendChild(statusBox);
    todoItem.appendChild(_title);
    todoItem.appendChild(_details);

    return todoItem;
  };

  return { render };
})();

const todoMaker = () => {
  const addTodo = () => {
    const user_input = document.body.querySelector("input#todo");
    todoInput.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        let todoContent = todoInput.value;
        const newTodo = new Todo(todoContent);
        activeFolder.addChild(newTodo);
        updateListPanel(getRootFolder());
        todoInput.value = "";
        updateTodoPanel(activeFolder);
      }
    });
  };
};
