var pubsub = require("pubsub.js");
import { format } from "date-fns";

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
    const statusBox = document.createElement("input");
    statusBox.setAttribute("type", "checkbox");
    statusBox.checked = checked;
    const _title = document.createElement("p");
    _title.textContent = title;
    _title.classList.add("title");
    _title.setAttribute("contenteditable", true);
    const _dueDate = document.createElement("span");
    _dueDate.classList.add("dueDate");
    _dueDate.textContent = formatDate(dueDate);
    const _details = document.createElement("p");
    _details.classList.add("details");
    _details.textContent = details;

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo");
    todoItem.dataset.id = id;

    todoItem.appendChild(statusBox);
    todoItem.appendChild(_title);
    todoItem.appendChild(_dueDate);
    if (_details.textContent.length > 0) todoItem.appendChild(_details);

    return todoItem;
  };

  const formatDate = (date) => {
    if (date == undefined) return;
    const currentYear = new Date().getFullYear();
    const todoYear = date.getFullYear();
    if (todoYear < currentYear) {
      return format(date, "MMM d, yyyy");
    } else {
      return format(date, "MMM d");
    }
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
