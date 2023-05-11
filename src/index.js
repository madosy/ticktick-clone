import "./styles/index.scss";
import "./styles/todoListPanel.scss";
import "./styles/projectsPanel.scss";
import "./styles/detail-panel.scss";

import {
  getAllProjects,
  getTodos,
  getInboxFolder,
  getRootFolder,
  getTodoByID,
  updateTodo,
} from "./data/todoModel";
import { projectsPanel } from "./project-list-panel/projectsPanel_view";
import { projectsPanel_controller } from "./project-list-panel/projectsPanel_controller";
import { todoListPanel_controller } from "./todo-list-panel/todoListPanel_controller";
import { todoDetailsPanel_controller } from "./todo-details-panel/todoDetailsPanel_controller";
import currentUser, { getCurrentUser } from "./data/userModel";

const pubsub = require("pubsub.js");

const todoApp = (() => {
  console.log(getRootFolder());

  const initialize = () => {
    projectsPanel.render(getAllProjects());

    let currentUser = getCurrentUser();
    currentUser.setActiveProject(getInboxFolder().id); // initialize inbox folder as active folder

    pubsub.publish("request_todoListPanel_update");
    pubsub.publish("request_todoDetailsPanel_update");
  };

  pubsub.subscribe("data_modified", () => {
    console.log("Processing view updates...");
    pubsub.publish("request_projectsPanel_update");
    pubsub.publish("request_todoListPanel_update");
  });

  return { initialize };
})();

window.addEventListener("DOMContentLoaded", () => {
  todoApp.initialize();
});
