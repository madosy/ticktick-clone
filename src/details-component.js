import default_image from "./assets/detail-panel-default.png";
import { format } from "date-fns";

const detailsPanel = (() => {
  const targetDiv = document.body.querySelector(".detail-panel");
  const initDefault = () => {
    const defaultTemplate = document.createElement("div");
    defaultTemplate.classList.add("default-template");
    const message = document.createElement("p");
    message.textContent = "Click task title to view the detail";
    const myImage = document.createElement("img");
    myImage.src = default_image;
    defaultTemplate.appendChild(myImage);
    defaultTemplate.appendChild(message);
    targetDiv.innerHTML = "";
    targetDiv.appendChild(defaultTemplate);
  };
  const initTodo = () => {
    const template = `
    <div class="todo-date">
        <input type="checkbox" name="detail-panel-checkbox" id="detail-panel-checkbox">
        <span class="date"></span>
        <span class="priority"></span>
    </div>
    <div contenteditable class="todo-title">Title is here</div>
    <div contenteditable class="todo-desc" placeholder="Write details about todo here"></div>
    <div class="todo-tools">A</div>`;

    targetDiv.innerHTML = template;

    const buttonCalendar = document.createElement("input");
    buttonCalendar.setAttribute("type", "date");
    buttonCalendar.setAttribute("onfocus", "this.showPicker()");
    buttonCalendar.classList.add("calendar");

    const date = targetDiv.querySelector(".date");
    date.appendChild(buttonCalendar);
  };
  const updateUI = (todo) => {
    initTodo();
    targetDiv.dataset.id = todo.id;

    const title_field = targetDiv.querySelector(".todo-title");
    title_field.textContent = todo.title;

    if (todo.dueDate != undefined) {
      targetDiv
        .querySelector("input.calendar")
        .setAttribute("value", format(todo.dueDate, "yyyy-MM-dd"));
    }

    if (todo.details != undefined)
      targetDiv.querySelector(".todo-desc").innerHTML = todo.details;
  };

  return { initDefault, updateUI };
})();

export { detailsPanel };
