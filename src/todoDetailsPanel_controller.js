const pubsub = require("pubsub.js");

import { detailsPanel } from "./todoDetailsPanel_view";
import { getTodoByID } from "./todoModel";
import { getCurrentUser } from "./userModel";

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
})();

export { todoDetailsPanel_controller };
