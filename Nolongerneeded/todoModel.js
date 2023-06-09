export class Todo {
  constructor(title, parentID) {
    this.title = title;
    this.parentID = parentID;
    this.id = "todo" + Math.random();
    this.checked = false;
  }
  priority;
  dueDate;
  details;
}

export class Folder {
  constructor(title, parentID) {
    this.title = title;
    this.parentID = parentID;
    this.id = "folder" + Math.random();
  }
  children = [];
  addChild(todo) {
    this.children.push(todo);
    todo.parentID = this.id;
  }
  removeChild(obj) {
    const ind = this.children.findIndex((child) => child.id == obj.id);
    this.children.splice(ind, 1);
  }
  count() {
    return this.children.length;
  }
}

Folder.prototype.returnParentAndChildren = function (
  callbackfn = (input) => console.log(input),
  option = 0 // 1 will inlcude parent
) {
  if (option == 1) callbackfn(this);
  if (this.count() > 0) {
    const childrenArray = this.children;
    childrenArray.forEach((child) => callbackfn(child));
  }
};

Folder.prototype.getTodos = function () {
  return this.children;
};

function createTodo(todo, folder) {}

export function getProjectByID(input) {
  const folderListByID = root.children.map((folder) => folder.id);
  const myFolderInd = folderListByID.indexOf(input);
  return root.children[myFolderInd];
}

export function getTodoByID(folderID, todoID) {
  const myFolder = getProjectByID(folderID);
  const todoListByInds = myFolder.children.map((todo) => todo.id);
  const myTodoInd = todoListByInds.indexOf(todoID);
  return myFolder.children[myTodoInd];
}

export function getAllProjects() {
  const myProjects = [];
  root.returnParentAndChildren((project) =>
    myProjects.push({
      id: project.id,
      title: project.title,
      count: project.count(),
    })
  );
  return myProjects;
}

export function getTodos(folder) {
  const myTodos = [];
  folder.returnParentAndChildren((todo) => myTodos.push(todo));
  return myTodos;
}

//Initialize Root and inbox folders
const root = new Folder("Root");
const inbox = new Folder("Inbox");
root.addChild(inbox);

const exampleFolder = new Folder("Doggy Related");
const exampleTodo = new Todo("Pet my dog at 2pm");
exampleTodo.dueDate = new Date(2023, 2, 21);
exampleTodo.details =
  "Black Jack <b>and</b> Cookie loves pets! They are the best pals in the world. <p>They give me so much joy and I love them so much :)</p><li>hi</li>";
root.addChild(exampleFolder);
exampleFolder.addChild(exampleTodo);
inbox.addChild(new Todo("Love myself!"));

localStorage.setItem("root", JSON.stringify(root));

const getRootFromStorage = () => JSON.parse(localStorage.getItem("root"));
const getInboxFromStorage = () => {
  root = JSON.parse(localStorage.getItem("root"));
};

export function getRootFolder() {
  return getRootFromStorage();
}

export function getInboxFolder() {
  return inbox;
}

export function addTodo(title, parentID) {
  const myTodo = new Todo(title);
  const parentFolder = getProjectByID(parentID);
  parentFolder.addChild(myTodo);
}

export function addFolder(title) {
  const myFolder = new Folder(title);
  root.addChild(myFolder);
}

export function updateTodo(parentID, todoID, propertyName, newContent) {
  const todoForModify = getTodoByID(parentID, todoID);
  todoForModify[propertyName] = newContent;
}
export function updateProject(id, propertyName, newContent) {
  const projectForModify = getProjectByID(id);
  projectForModify[propertyName] = newContent;
}

export function updateProjectName(id, newName) {
  updateProject(id, "title", newName);
}

export function deleteProject(id) {
  const deletionID = getAllProjects().findIndex((item) => item.id == id);
  root.children.splice(deletionID, 1);
}
