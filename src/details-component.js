import default_image from "./assets/detail-panel-default.png";

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
        <span class="date">12/1/2023</span>
        <span class="priority">🚩</span>
    </div>
    <div contenteditable class="todo-title">Title is here</div>
    <div contenteditable class="todo-desc" placeholder="Write details about todo here"></div>
    <div class="todo-tools">A</div>`;
    targetDiv.innerHTML = template;
    const title = targetDiv.querySelector(".todo-title");
    const description = targetDiv.querySelector(".todo-desc");
    title.addEventListener("input", () => console.log("title modified"));
    description.addEventListener("input", () => console.log("desc. modified"));
  };
  const updateUI = (todo) => {
    initTodo();
    targetDiv.querySelector(".todo-title").textContent = todo.title;
    if (todo.details != undefined)
      targetDiv.querySelector(".todo-desc").innerHTML = todo.details;
  };

  return { initDefault, updateUI };
})();

export { detailsPanel };
