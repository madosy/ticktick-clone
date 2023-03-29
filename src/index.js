import "./styles/index.scss";
import "./styles/todo.scss";
import "./styles/list-panel.scss";
import "./controller";

import { updateListPanel, updateTodoPanel } from "./view";
import { Todo, Folder, getRootFolder, getFolderByID } from "./dataAccessor";
import { details_component } from "./details-component";

const todo = () => {
  const todoInput = document.querySelector("input#todo");
};

// Temporarily set root folder to Inbox for testing
let activeFolder = getRootFolder().children[1];
// When you press enter, add todo to active list
const todoInput = document.body.querySelector("input#todo");
todoInput.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    let todoContent = todoInput.value;
    const newTodo = new Todo(todoContent);
    activeFolder.addChild(newTodo);
    updateListPanel(getRootFolder());
    todoInput.value = "";
    updateTodoPanel(activeFolder);
  }
});

console.log(getRootFolder());

updateListPanel(getRootFolder());

//function that changes active folder on click
let folders = document.querySelectorAll(".list");
folders.forEach((item) =>
  item.addEventListener("click", (e) => {
    console.log("closest: " + e.target.closest(".list"));
    const folderID = e.target.closest(".list").dataset.id;
    console.log(folderID);
    activeFolder = getFolderByID(folderID);
    console.log(activeFolder);
    updateTodoPanel(activeFolder);
  })
);

function setActiveFolder(node) {}

window.addEventListener("DOMContentLoaded", () => {
  details_component.initDefault();
});
