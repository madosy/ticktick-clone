var pubsub = require("pubsub.js");
import { format } from "date-fns";

export const todoPanel = (() => {
  const render = (title, todoArray) => {
    renderProjTitle(title);
    renderTodoInputField(title);
    renderTodos(todoArray);
  };

  const renderProjTitle = (title) => {
    const selectedList = document.body.querySelector(".selected-list");
    selectedList.textContent = title;
  };

  const renderTodoInputField = (title) => {
    const container = document.querySelector(".todo-container");
    const todoInput = document.createElement("input");
    todoInput.setAttribute("type", "text");
    todoInput.setAttribute("id", "todo");
    todoInput.setAttribute(
      "placeholder",
      `+ Add task to "${title}". Press enter to save.`
    );
    todoInput.addEventListener("keydown", (e) => {
      const filteredInput = todoInput.value.replace(/\s/g, "");
      if (e.code == "Enter" && filteredInput.length > 0) {
        pubsub.publish("add_todo", [todoInput.value]);
        todoInput.value = "";
      }
    });
    container.replaceChildren(todoInput);
  };

  const renderTodos = (todos) => {
    const todoList = document.body.querySelector(".todo-list");
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const renderedItem = renderItem(todo);
      todoList.appendChild(renderedItem);
    });
  };

  const renderItem = ({ id, title, dueDate, priority, checked, details }) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo");
    todoItem.dataset.id = id;
    todoItem.addEventListener("click", () => {
      pubsub.publish("select_active_todo", [id]);
    });

    const statusBox = document.createElement("input");
    statusBox.setAttribute("type", "checkbox");
    statusBox.checked = checked;
    statusBox.addEventListener("input", () => {
      pubsub.publish("modify_todo", [id, "checked", statusBox.checked]);
    });

    const _title = document.createElement("p");
    _title.textContent = title;
    _title.classList.add("title");
    _title.setAttribute("contenteditable", true);
    _title.addEventListener("input", () => {
      pubsub.publish("modify_todo", [id, "title", _title.textContent]);
    });

    const _dueDate = document.createElement("span");
    _dueDate.classList.add("dueDate");
    _dueDate.textContent = formatDate(dueDate);

    const _details = document.createElement("p");
    _details.classList.add("details");
    if (details != undefined) {
      const dummyDiv = document.createElement("div");
      dummyDiv.innerHTML = details; // this was the easiest way to just grab the text...
      _details.textContent = dummyDiv.textContent;
    }

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
