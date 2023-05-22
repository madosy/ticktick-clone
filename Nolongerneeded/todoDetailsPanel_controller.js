const pubsub = require("pubsub.js");

import { detailsPanel } from "./todoDetailsPanel_view";
import { getTodoByID, updateTodo } from "../data/todoModel";
import { getCurrentUser } from "../data/userModel";

const todoDetailsPanel_controller = (() => {
  pubsub.subscribe("request_todoDetailsPanel_update", () => {
    const activeProject = getCurrentUser().getActiveProjectID();
    const activeTodo = getCurrentUser().getActiveTodoID();
    const myTodo = getTodoByID(activeProject, activeTodo);

    if (activeTodo == undefined) {
      detailsPanel.renderDefaultMessage();
    } else {
      detailsPanel.renderTodo(
        myTodo.title,
        myTodo.details,
        myTodo.dueDate,
        myTodo.checked,
        myTodo.priority
      );
    }
  });

  pubsub.subscribe("todoDetailsPanel_modify_todo", (...data) => {
    const parentID = getCurrentUser().getActiveProjectID();
    const todoID = getCurrentUser().getActiveTodoID();
    const content = data.find((item) => item.hasOwnProperty("content")).content;
    const property = data.find((item) => item.hasOwnProperty("prop")).prop;

    updateTodo(parentID, todoID, property, content);
    pubsub.publish("request_todoListPanel_update");
  });
})();

export { todoDetailsPanel_controller };
