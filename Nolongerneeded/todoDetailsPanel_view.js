import todoDetailContentGenerator from "./todoDetailContentGenerator";

const detailsPanel = (() => {
  const container = document.body.querySelector(".detail-panel");

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
    top_div.appendChild(todoDetailContentGenerator.checkbox(checked));
    top_div.appendChild(todoDetailContentGenerator.calendar(dueDate));
    top_div.appendChild(todoDetailContentGenerator.priority());

    container.innerHTML = "";
    container.appendChild(top_div);
    container.appendChild(todoDetailContentGenerator.todoTitle(title));
    container.appendChild(todoDetailContentGenerator.todoDesc(details));
  };

  return { renderDefaultMessage, renderTodo };
})();

export { detailsPanel };
