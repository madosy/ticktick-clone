var pubsub = require("pubsub.js");
import { format } from "date-fns";
import { renderTitleAndInput } from "./displayController-components/renderProjectTitle";
import { getProjectByID } from "../data/todoModel";
import { userSession } from "../data/userSession";

const todoListPanel_displayController = (() => {
  function render() {
    renderProjectTitle();
    renderTodoInput();
    renderTodos();
  }
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
      console.log("check");
      pubsub.publish("todoListPanel_modify_todo", [
        { content: statusBox.checked, prop: "checked" },
      ]);
    });

    const _title = document.createElement("p");
    _title.textContent = title;
    _title.classList.add("title");
    _title.setAttribute("contenteditable", true);
    _title.addEventListener("input", () => {
      pubsub.publish("todoListPanel_modify_todo", [
        { content: _title.textContent, prop: "title" },
      ]);
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

export default { todoListPanel_displayController };
