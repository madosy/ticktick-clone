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
  updateTodo,
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
        pubsub.publish("render todo panel", [getTodos(activeFolder)]);
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
        detectDetailPanelChange();
      })
    );
  };

  const detectTodoUserInput = () => {
    const userInput = document.body.querySelector("input#todo");
    userInput.addEventListener("keydown", (e) => {
      if (e.keyCode == 13 && userInput.value.replace(/\s/g, "").length > 0) {
        addTodo({ title: userInput.value, parentID: activeFolder.id });
        userInput.value = "";
        pubsub.publish("render todo panel", [getTodos(activeFolder)]);
      }
    });
  };

  const detectDetailPanelChange = () => {
    const detailPanel = document.querySelector(".detail-panel");
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
  };

  pubsub.subscribe("render list panel", detectActiveFolder);
  pubsub.subscribe("render list panel", detectTodoUserInput);
  pubsub.subscribe("render list title", todoPanel.render);
  pubsub.subscribe("render list title", detailsPanel.initDefault);
  pubsub.subscribe("render list title", (title) => {
    const todoInput = document.querySelector("#todo");
    todoInput.setAttribute(
      "placeholder",
      `+ Add task to "${title}". Press enter to save.`
    );
  });
  pubsub.subscribe("render todo panel", todoPanel.render);
  pubsub.subscribe("render todo panel", detectActiveTodo);
  pubsub.subscribe("add todo", todoPanel.render);
  pubsub.subscribe(
    "todo modified",
    (parentID, todoID, propertyName, newContent) =>
      updateTodo(parentID, todoID, propertyName, newContent)
  );

  return { initialize, activeFolder };
})();

window.addEventListener("DOMContentLoaded", () => {
  todoApp.initialize();
});
