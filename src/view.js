class View {
  addTodoItem({ title, description, dueDate }) {
    const todo = document.createElement("div");
    todo.classList.add("todo");
    todo.innerHTML = `
        <div class="header">
        <span class="title">${title}</span> <span class="due-date">${dueDate}</span>
        </div>
        <p class="description">${description}</p>`;
    document.body.querySelector("#app-container").appendChild(todo);
  }
}

export { View };
