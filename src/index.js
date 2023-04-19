import "./styles/index.scss";
import "./styles/todo-panel.scss";
import "./styles/list-panel.scss";
import "./styles/detail-panel.scss";

import {
  getAllProjects,
  getTodos,
  getInboxFolder,
  getRootFolder,
  getTodoByID,
  updateTodo,
} from "./todoModel";
import { projectsPanel } from "./projectsPanel_view";
import { detailsPanel } from "./todoDetailsPanel_view";
import { todoPanel } from "./todoListPanel_view";
import { projectsPanel_controller } from "./projectsPanel_controller";
import { todoListPanel_controller } from "./todoListPanel_controller";
import currentUser, { getCurrentUser } from "./userModel";

const pubsub = require("pubsub.js");

const todoApp = (() => {
  console.log(getRootFolder());

  const initialize = () => {
    projectsPanel.render(getAllProjects());

    let currentUser = getCurrentUser();
    currentUser.setActiveProject(getInboxFolder().id); // initialize inbox folder as active folder

    pubsub.publish("request_todoListPanel_update");

    detailsPanel.initDefault();
  };

  pubsub.subscribe("data_modified", () => {
    console.log("Processing view updates...");
    pubsub.publish("request_projectsPanel_update");
    pubsub.publish("request_todoListPanel_update");
  });

  const detectActiveTodo = () => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) =>
      todo.addEventListener("click", (e) => {
        const folderID = activeFolder.id;
        const todoID = e.target.closest(".todo").dataset.id;
        const todo = getTodoByID(folderID, todoID);
        detailsPanel.updateUI(todo);
        detectTodoChange();
      })
    );
  };

  const detectTodoChange = () => {
    const detailPanel = document.querySelector(".detail-panel");
    const todoPanel = document.querySelector(".todo-panel");
    const parentID = activeFolder.id;

    const date_field = detailPanel.querySelector(".calendar");
    date_field.addEventListener("input", () => {
      const todoID = date_field.closest(".detail-panel").dataset.id;
      const dateObj = new Date(Date.parse(date_field.value));
      pubsub.publish("todo modified", [
        parentID,
        todoID,
        "dueDate",
        new Date(`${date_field.value}T00:00`),
      ]);
      pubsub.publish("render todo panel", [getTodos(activeFolder)]);
    });

    const title_field = detailPanel.querySelector(".todo-title");
    title_field.addEventListener("input", () => {
      const todoID = title_field.closest(".detail-panel").dataset.id;
      pubsub.publish("todo modified", [
        parentID,
        todoID,
        "title",
        title_field.textContent,
      ]);
      pubsub.publish("render todo panel", [getTodos(activeFolder)]);
    });

    const todoPanel_title_fields = todoPanel.querySelectorAll(".todo > .title");
    todoPanel_title_fields.forEach((field) =>
      field.addEventListener("input", () => {
        const todoID = field.closest(".todo").dataset.id;
        pubsub.publish("todo modified", [
          parentID,
          todoID,
          "title",
          field.textContent,
        ]);
        const todo = getTodoByID(parentID, todoID);
        detailsPanel.updateUI(todo);
        detectTodoChange();
      })
    );

    const description_field = detailPanel.querySelector(".todo-desc");
    description_field.addEventListener("input", () => {
      const todoID = description_field.closest(".detail-panel").dataset.id;
      pubsub.publish("todo modified", [
        parentID,
        todoID,
        "details",
        description_field.innerHTML,
      ]);
      pubsub.publish("render todo panel", [getTodos(activeFolder)]);
    });

    const check_field = detailPanel.querySelector("#detail-panel-checkbox");
    const todo_check_field = todoPanel.querySelector("input[type='checkbox']");
    check_field.addEventListener("input", () => {
      const todoID = check_field.closest(".detail-panel").dataset.id;
      pubsub.publish("todo modified", [
        parentID,
        todoID,
        "checked",
        check_field.checked,
      ]);
      pubsub.publish("render todo panel", [getTodos(activeFolder)]);
    });
    todo_check_field.addEventListener("input", () => {
      const todoID = todo_check_field.closest(".todo").dataset.id;
      pubsub.publish("todo modified", [
        parentID,
        todoID,
        "checked",
        todo_check_field.checked,
      ]);
      const todo = getTodoByID(parentID, todoID);
      detailsPanel.updateUI(todo);
      detectTodoChange();
    });
  };

  pubsub.subscribe("render list title", detailsPanel.initDefault);
  pubsub.subscribe("render todo panel", todoPanel.render);

  pubsub.subscribe(
    "todo modified",
    (parentID, todoID, propertyName, newContent) =>
      updateTodo(parentID, todoID, propertyName, newContent)
  );

  return { initialize };
})();

window.addEventListener("DOMContentLoaded", () => {
  todoApp.initialize();
});
