import default_image from "./assets/detail-panel-default.png";

export const details_component = (() => {
  const details_panel = document.body.querySelector(".detail-panel");
  const initDefault = () => {
    const default_template = document.createElement("div");
    default_template.classList.add("default-template");
    const message = document.createElement("p");
    message.textContent = "Click task title to view the detail";
    const myImage = document.createElement("img");
    myImage.src = default_image;
    default_template.appendChild(myImage);
    default_template.appendChild(message);
    details_panel.appendChild(default_template);
  };
  const initTodo = () => {
    details_component.classList.add("initialized");
    const template = `
    <div class="todo-date">
        <input type="checkbox" name="detail-panel-checkbox" id="detail-panel-checkbox">
        <span class="date">12/1/2023</span>
        <span class="priority">🚩</span>
    </div>
    <div contenteditable class="todo-title">Title is here</div>
    <div contenteditable class="todo-desc">This is some desc about the <b>task</b></div>
    <div class="todo-tools">A</div>`;
    details_panel.innerHTML = template;
  };
  const updateUI = (todo) => {
    details_panel.querySelector("todo-title").textContent = todo.title;
    details_panel.querySelector("todo-desc").innerHTML = todo.details;
  };

  return { initDefault, updateUI };
})();
