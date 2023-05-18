const renderTitleAndInput = (projectTitle) => {
  renderProjTitle(projectTitle);
  renderTodoInputField(projectTitle);

  function renderProjTitle(inputText) {
    const selectedList = document.body.querySelector(".selected-list");
    selectedList.textContent = inputText;
  }

  function renderTodoInputField(inputText) {
    const container = document.querySelector(".todo-container");
    const todoInput = document.createElement("input");
    todoInput.setAttribute("type", "text");
    todoInput.setAttribute("id", "todo");
    todoInput.setAttribute(
      "placeholder",
      `+ Add task to "${inputText}". Press enter to save.`
    );
    todoInput.addEventListener("keydown", (e) => {
      const filteredInput = todoInput.value.replace(/\s/g, "");
      if (e.code == "Enter" && filteredInput.length > 0) {
        pubsub.publish("add_todo", [todoInput.value]);
        todoInput.value = "";
      }
    });
    container.replaceChildren(todoInput);
  }
};

export { renderTitleAndInput };
