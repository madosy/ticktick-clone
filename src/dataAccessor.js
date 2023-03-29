export class Todo {
  constructor(title, parentID) {
    this.title = title;
    this.parentID = parentID;
    this.id = "todo" + Math.random();
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
  addChild(obj) {
    this.children.push(obj);
    obj.parentID = this.id;
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

export function getFolderByID(input) {
  const folderListByID = root.children.map((folder) => folder.id);
  const myFolderInd = folderListByID.indexOf(input);
  return root.children[myFolderInd];
}

//Initialize Root and inbox folders
const root = new Folder("Root");
const inbox = new Folder("Inbox");
root.addChild(inbox);

const exampleFolder = new Folder("Doggy Related");
const exampleTodo = new Todo("Pet my dog at 2pm");
root.addChild(exampleFolder);
exampleFolder.addChild(exampleTodo);

export function getRootFolder() {
  return root;
}

export function getInboxFolder() {
  return inbox;
}
