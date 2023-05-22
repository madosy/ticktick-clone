const todoDetailContentGenerator = (() => {
  function calendar(date) {
    const date_input = document.createElement("input");
    date_input.setAttribute("type", "date");
    date_input.setAttribute("onfocus", "this.showPicker()");
    if (isDate(date)) {
      date_input.setAttribute("value", format(date, "yyyy-MM-dd"));
    }
    date_input.addEventListener("input", () => {
      pubsub.publish("todoDetailsPanel_modify_todo", [
        { content: new Date(date_input.value + "T00:00"), prop: "dueDate" },
      ]);
    });
    const wrapper = document.createElement("span");
    wrapper.classList.add("date");
    wrapper.appendChild(date_input);
    return wrapper;
  }

  function checkbox(status) {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.id = "detail-panel-checkbox";
    checkbox.checked = status;
    checkbox.addEventListener("input", () =>
      pubsub.publish("todoDetailsPanel_modify_todo", [
        { content: checkbox.checked, prop: "checked" },
      ])
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
      pubsub.publish("todoDetailsPanel_modify_todo", [
        { content: todoTitle.innerText, prop: "title" },
      ])
    );
    return todoTitle;
  }

  function todoDesc(html) {
    const div = document.createElement("div");
    div.contentEditable = true;
    div.classList.add("todo-desc");
    if (html != undefined) div.innerHTML = html;
    div.addEventListener("input", () =>
      pubsub.publish("todoDetailsPanel_modify_todo", [
        { content: div.innerHTML, prop: "details" },
      ])
    );
    return div;
  }

  return { calendar, checkbox, priority, todoTitle, todoDesc };
})();

export default todoDetailContentGenerator;
