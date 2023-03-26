import "./styles/index.scss";
import "./styles/todo.scss";
import "./styles/list-panel.scss";
import "./controller";

import { updateListPanel, updateTodoPanel } from "./view";
import { Todo, Folder, getRootFolder } from "./dataAccessor";

const todo = () => {
  const todoInput = document.querySelector("input#todo");
};

// Temporarily set root folder to Inbox for testing
let activeFolder = getRootFolder().children[0];

const todoInput = document.body.querySelector("input#todo");
todoInput.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    let todoContent = document.createTextNode(todoInput.value);
    const newTodo = new Todo(todoContent);
    activeFolder.addChild(newTodo);
    updateListPanel(getRootFolder());
    todoInput.value = "";
    updateTodoPanel(activeFolder);
  }
});

console.log(getRootFolder());

updateListPanel(getRootFolder());
