import "./styles/index.scss";
import "./styles/todo-panel.scss";
import "./styles/list-panel.scss";
import "./styles/detail-panel.scss";

import {
  getFolderByID,
  getProjects,
  getTodos,
  getInboxFolder,
  getRootFolder,
  addTodo,
  getTodoByID,
} from "./dataAccessor";
import { listPanel } from "./list-panel-component";
import { detailsPanel } from "./details-component";
import { todoPanel } from "./todo-panel-component";

const pubsub = require("pubsub.js");

const todoApp = (() => {
  console.log(getRootFolder());
  let activeFolder = getInboxFolder(); // initialize inbox folder as active folder

  const initialize = () => {
    listPanel.render(getProjects());
    todoPanel.render(activeFolder.title);
    todoPanel.render(getTodos(activeFolder));
    detectActiveTodo();
    detailsPanel.initDefault();
  };

  const detectActiveFolder = () => {
    const folders = document.querySelectorAll(".list");
    folders.forEach((item) =>
      item.addEventListener("click", (e) => {
        const folderID = e.target.closest(".list").dataset.id;
        if (activeFolder.id == folderID) return;
        activeFolder = getFolderByID(folderID);
        pubsub.publish("render list items", [getTodos(activeFolder)]);
        pubsub.publish("render list title", [activeFolder.title]);
      })
    );
  };

  const detectActiveTodo = () => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) =>
      todo.addEventListener("click", (e) => {
        const folderID = activeFolder.id;
        const todoID = e.target.closest(".todo").dataset.id;
        const todo = getTodoByID(folderID, todoID);
        detailsPanel.updateUI(todo);
      })
    );
  };

  const detectTodoUserInput = () => {
    const userInput = document.body.querySelector("input#todo");
    userInput.addEventListener("keydown", (e) => {
      if (e.keyCode == 13 && userInput.value.replace(/\s/g, "").length > 0) {
        addTodo({ title: userInput.value, parentID: activeFolder.id });
        userInput.value = "";
        pubsub.publish("render list items", [getTodos(activeFolder)]);
      }
    });
  };

  pubsub.subscribe("render list panel", detectActiveFolder);
  pubsub.subscribe("render list panel", detectTodoUserInput);
  pubsub.subscribe("render list title", todoPanel.render);
  pubsub.subscribe("render list title", detailsPanel.initDefault);
  pubsub.subscribe("render list items", todoPanel.render);
  pubsub.subscribe("render list items", detectActiveTodo);
  pubsub.subscribe("add todo", todoPanel.render);

  return { initialize, activeFolder };
})();

window.addEventListener("DOMContentLoaded", () => {
  todoApp.initialize();
});
