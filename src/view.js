const createListItem = ({ title, type, id, count }) => {
  const item = document.createElement("div");
  item.classList.add("list");
  item.dataset.id = id;
  item.innerHTML = `
<span class="material-symbols-outlined">folder</span>
<span class="title">${title}</span>
<span class="count">${count}</span>`;
  if (type == "folder") {
    console.log("use folder creator");
  }
  return item;
};

const createTodoItem = ({ title, id, parentID }) => {
  const item = document.createElement("div");
  const currentTitle = title;
  item.classList.add("todo");
  item.dataset.id = id;
  item.dataset.pid = parentID;
  item.innerHTML = `
<span class="material-symbols-outlined">list</span>
<span class="title">${currentTitle}</span>`;

  return item;
};

function placeFolderOrder(folderObject) {
  const itemPlacedForOrder = {
    title: folderObject.title,
    id: folderObject.id,
    parentID: folderObject.parentID,
    count: folderObject.count(),
  };

  const createdItem = createListItem(itemPlacedForOrder);
  return createdItem;
}

function placeTodoOrder(todoObject) {
  const itemPlacedForOrder = {
    title: todoObject.title,
    id: todoObject.id,
    parentID: todoObject.parentID,
  };

  const createdItem = createTodoItem(itemPlacedForOrder);
  return createdItem;
}

function updateListPanel(rootFolder) {
  const listPanel = document.body.querySelector(".list-panel");
  listPanel.innerHTML = "";
  rootFolder.returnParentAndChildren((input) => {
    const itemToAppend = placeFolderOrder(input);
    listPanel.appendChild(itemToAppend);
  });
}

function updateTodoPanel(activeFolder) {
  const todoList = document.body.querySelector(".todo-list");
  todoList.innerHTML = "";
  activeFolder.returnParentAndChildren((input) => {
    const itemToAppend = placeTodoOrder(input);
    todoList.appendChild(itemToAppend);
  });
}

export { updateListPanel, updateTodoPanel };
