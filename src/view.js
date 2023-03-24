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

  // list column item generation:

  makeListColumn(data) {
    function generateListColumn(inputArr) {
      const listColumn = document.createElement("div");
      listColumn.classList.add("list-column");
      inputArr.forEach((item) => {
        const itemForAppend = generateListItem(item);
        listColumn.appendChild(itemForAppend);
      });
      return listColumn;
    }
  }
}

function generateListItem({ id, type, title, items }) {
  const listItem = document.createElement("div");
  listItem.classList = "item";
  //   listItem.dataset = id;
  console.log(items);

  listItem.innerHTML = `<span class="icon">😃</span>
          <span class="title">${title}</span>
          <span class="count">${items.length}</span>`;

  return listItem;
}

function updateListColumn(data) {
  const listColumn = document.body.querySelector(".list-column");
  console.log(data);
  data.forEach((item) => {
    const itemForAppend = generateListItem(item);
    listColumn.appendChild(itemForAppend);
  });
}

export { View, updateListColumn };
