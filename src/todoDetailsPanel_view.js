import default_image from "./assets/detail-panel-default.png";
import { format } from "date-fns";

const detailsPanel = (() => {
  const container = document.body.querySelector(".detail-panel");

  const initDefault = () => {
    container.innerHTML = "";
    container.replaceChild(noTodoContent());
  };

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

    container.innerHTML = template;

    const buttonCalendar = document.createElement("input");
    buttonCalendar.setAttribute("type", "date");
    buttonCalendar.setAttribute("onfocus", "this.showPicker()");
    buttonCalendar.classList.add("calendar");

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

  return { initDefault, updateUI };
})();

export { detailsPanel };
