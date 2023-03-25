import "./styles/index.scss";
import "./styles/todo.scss";
import "./styles/list-panel.scss";

import { placeFolderOrder } from "./view";

import { Todo, Folder } from "./dataAccessor";

const listPanelFolder = new Folder("List Panel Items");
const myFolder = new Folder("Professional Projects");
const myOtherFolder = new Folder("Personal Projects");
const myTodo = new Todo("Pet my dog");
listPanelFolder.addChild(myFolder);
listPanelFolder.addChild(myOtherFolder);
myFolder.addChild(myTodo);

console.log(listPanelFolder);

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

(input) => {
  const itemToAppend = placeFolderOrder(input);
  listPanel.appendChild(itemToAppend);
  itemToAppend.dataset.id = this.parentID;
};

const listPanel = document.body.querySelector(".list-panel");
listPanelFolder.returnParentAndChildren((input) => {
  const itemToAppend = placeFolderOrder(input);
  listPanel.appendChild(itemToAppend);
});
// ----
