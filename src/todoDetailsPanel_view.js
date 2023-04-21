import default_image from "./assets/detail-panel-default.png";
import { format, isDate } from "date-fns";
import { getCurrentUser } from "./userModel";
import { getTodoByID } from "./todoModel";
var pubsub = require("pubsub.js");

const detailsPanel = (() => {
  const container = document.body.querySelector(".detail-panel");

  function render() {
    const activeProject = getCurrentUser().getActiveProjectID();
    const activeTodo = getCurrentUser().getActiveTodoID();
    const myTodo = getTodoByID(activeProject, activeTodo);
  }

  const renderDefaultMessage = () => {
    const message = document.createElement("p");
    message.textContent = "Click task title to view the detail";

    const myImage = document.createElement("img");
    myImage.src = default_image;

    const div = document.createElement("div");
    div.classList.add("default-template");
    div.appendChild(myImage);
    div.appendChild(message);

    container.replaceChildren(div);
  };

  const renderTodo = (title, details, dueDate, checked, priority) => {
    const top_div = document.createElement("div");
    top_div.classList.add("todo-date");
    top_div.appendChild(contentGenerator.checkbox(checked));
    top_div.appendChild(contentGenerator.calendar(dueDate));
    top_div.appendChild(contentGenerator.priority());

    container.innerHTML = "";
    container.appendChild(top_div);
    container.appendChild(contentGenerator.todoTitle(title));
    container.appendChild(contentGenerator.todoDesc(details));
  };

  const contentGenerator = (() => {
    function calendar(date) {
      const date_input = document.createElement("input");
      date_input.setAttribute("type", "date");
      date_input.setAttribute("onfocus", "this.showPicker()");
      if (isDate(date)) {
        date_input.setAttribute("value", format(date, "yyyy-MM-dd"));
      }
      date_input.addEventListener("input", () => console.log("date changed"));
      return date_input;
    }

    function checkbox(status) {
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.id = "detail-panel-checkbox";
      checkbox.checked = status;
      checkbox.addEventListener("input", () =>
        console.log("checkbox clicked!")
      );
      return checkbox;
    }

    function priority() {
      const span = document.createElement("span");
      span.classList.add("priority");
      span.innerText = "|>";
      span.addEventListener("click", () => console.log("priority clicked!"));
      return span;
    }

    function todoTitle(text) {
      const todoTitle = document.createElement("div");
      todoTitle.contentEditable = true;
      todoTitle.classList.add("todo-title");
      todoTitle.innerText = text;
      todoTitle.addEventListener("input", () =>
        console.log(todoTitle.innerText)
      );
      return todoTitle;
    }

    function todoDesc(html) {
      const div = document.createElement("div");
      div.contentEditable = true;
      div.classList.add("todo-desc");
      if (html != undefined) div.innerHTML = html;
      div.addEventListener("input", () =>
        console.log("desc was modified but not saved.")
      );
      return div;
    }

    return { calendar, checkbox, priority, todoTitle, todoDesc };
  })();

  return { renderDefaultMessage, renderTodo };
})();

export { detailsPanel };
