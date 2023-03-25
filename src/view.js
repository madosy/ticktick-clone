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
    const itemForAppend = createListItem(item);
    listColumn.appendChild(itemForAppend);
    itemForAppend.dataset.id = item.id;
    if (item.type == "folder")
      itemForAppend.addEventListener("click", () => console.log("hello"));
  });
}

const createListItem = ({ title, type, id, count }) => {
  const item = document.createElement("div");
  item.classList.add("list");
  item.dataset.id = id;
  item.innerHTML = `
<span class="material-symbols-outlined">folder</span>
<span class="title">${title}</span>
<span class="count">${count}</span>
`;
  if (type == "folder") {
    console.log("use folder creator");
  }
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

function createFolderItem() {}

export { placeFolderOrder };
