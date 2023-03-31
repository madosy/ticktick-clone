import "./styles/index.scss";
import "./styles/todo-panel.scss";
import "./styles/list-panel.scss";

import {
  getFolderByID,
  getProjects,
  getTodos,
  getInboxFolder,
  getRootFolder,
} from "./dataAccessor";
import { listPanel } from "./list-panel-component";
import { details_component as detailsPanel } from "./details-component";
import { todoPanel } from "./todo-panel-component";

var pubsub = require("pubsub.js");

const todoApp = (() => {
  console.log(getRootFolder());
  let activeFolder = getInboxFolder(); //initialize inbox folder as active folder

  const initialize = () => {
    const myProjects = getProjects();
    listPanel.render(myProjects);
    const myTodos = getTodos(activeFolder);
    todoPanel.render(myTodos);
    detailsPanel.initDefault();
  };

  const makeFoldersClickable = () => {
    let folders = document.querySelectorAll(".list");
    folders.forEach((item) =>
      item.addEventListener("click", (e) => {
        const folderID = e.target.closest(".list").dataset.id;
        activeFolder = getFolderByID(folderID);
        pubsub.publish("set active folder", [getTodos(activeFolder)]);
      })
    );
  };
  pubsub.subscribe("render list panel", makeFoldersClickable);
  pubsub.subscribe("set active folder", todoPanel.render);
  pubsub.subscribe("add todo", todoPanel.render);

  return { initialize };
})();

window.addEventListener("DOMContentLoaded", () => {
  todoApp.initialize();
});
