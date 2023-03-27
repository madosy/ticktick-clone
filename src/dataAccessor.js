export class Todo {
  constructor(title, parentID) {
    this.title = title;
    this.parentID = parentID;
    this.id = "todo" + Math.random();
  }
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

function createTodo(todo, folder) {}

export function getFolderByID(input) {
  const folderInds = rootFolder.children.map((folder) => folder.id);
  console.log(folderInds);

  const myFolderInd = folderInds.indexOf(input);
  console.log(`my folder ind: ${myFolderInd}`);

  return rootFolder.children[myFolderInd];
}

//Initialize Root folder and inbox list
const rootFolder = new Folder("Root");
rootFolder.addChild(new Folder("Inbox"));

const exampleFolder = new Folder("Doggy Related");
const exampleTodo = new Todo("Pet my dog at 2pm");
rootFolder.addChild(exampleFolder);
exampleFolder.addChild(exampleTodo);

export function getRootFolder() {
  return rootFolder;
}
