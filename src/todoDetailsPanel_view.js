import default_image from "./assets/detail-panel-default.png";
import { format } from "date-fns";
import { getCurrentUser } from "./userModel";
import { getTodoByID } from "./todoModel";
const pubsub = require("pubsub.js");

const detailsPanel = (() => {
  const container = document.body.querySelector(".detail-panel");

  function render() {
    const activeProject = getCurrentUser().getActiveProjectID();
    const activeTodo = getCurrentUser().getActiveTodoID();
    const myTodo = getTodoByID(activeProject, activeTodo);

    if (activeTodo == undefined) {
      container.replaceChildren(noTodoContent());
    } else {
      container.replaceChildren(generateContent());
      console.log("rendering selected todo");
    }
  }

  const noTodoContent = () => {
    const message = document.createElement("p");
    message.textContent = "Click task title to view the detail";

    const myImage = document.createElement("img");
    myImage.src = default_image;

    const container = document.createElement("div");
    container.classList.add("default-template");
    container.appendChild(myImage);
    container.appendChild(message);

    return container;
  };

  const generateContent = () => {
    const template = `
    <div class="todo-date">
        <input type="checkbox" name="detail-panel-checkbox" id="detail-panel-checkbox">
        <span class="date"></span>
        <span class="priority"></span>
    </div>
    <div contenteditable class="todo-title">Title is here!</div>
    <div contenteditable class="todo-desc" placeholder="Write details about todo here"></div>
    <div class="todo-tools">A</div>`;

    const calendarInput = (dueDate) => {
      const calendarInput = document.createElement("input");
      calendarInput.setAttribute("type", "date");
      calendarInput.setAttribute("onfocus", "this.showPicker()");
      if (dueDate != undefined)
        calendarInput.setAttribute("value", format(dueDate, "yyyy-MM-dd"));
      calendarInput.classList.add("calendar");
      calendarInput.addEventListener("input", (e) => {});
      return { calendarInput };
    };

    const checkbox = (checked) => {
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.id = "detail-panel-checkbox";
      checkbox.addEventListener("input", () => {
        const todoID = getCurrentUser().getActiveTodoID();
        //detail was modified announce.
      });
      return checkbox;
    };

    const priority = () => {
      const priority = document.createElement("span");
      priority.classList.add("priority");
      return { priority };
    };

    const todoTitle = () => {
      const todoTitle = document.createElement("div");
      todoTitle.setAttribute("contenteditable");
      todoTitle.classList.add("todo-title");
      todoTitle.innerText = input;
      return todoTitle;
    };

    const todoDescription = () => {};

    const todoToolbar = () => {};

    const content = document.createElement("div");
  };

  const initTodo = () => {
    container.innerHTML = template;

    const date = container.querySelector(".date");
    date.appendChild(buttonCalendar);
  };
  const updateUI = (todo) => {
    initTodo();
    container.dataset.id = todo.id;

    const check_field = container.querySelector("input[type='checkbox']");
    check_field.checked = todo.checked;

    const title_field = container.querySelector(".todo-title");
    title_field.textContent = todo.title;

    if (todo.dueDate != undefined) {
      container
        .querySelector("input.calendar")
        .setAttribute("value", format(todo.dueDate, "yyyy-MM-dd"));
    }

    if (todo.details != undefined)
      container.querySelector(".todo-desc").innerHTML = todo.details;
  };

  return { updateUI, render };
})();

export { detailsPanel };
