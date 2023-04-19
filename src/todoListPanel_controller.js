var pubsub = require("pubsub.js");

import { todoPanel } from "./todoListPanel_view";
import { addTodo, getProjectByID, updateTodo } from "./todoModel";
import { getCurrentUser } from "./userModel";

const todoListPanel_controller = (() => {
  const getActiveProjectObj = () => {
    const activeProject = getCurrentUser().getActiveProjectID();
    const myProject = getProjectByID(activeProject);
    return myProject;
  };
  pubsub.subscribe("request_todoListPanel_update", () => {
    const activeProject = getActiveProjectObj();
    todoPanel.render(activeProject.title, activeProject.children);
  });

  pubsub.subscribe("add_todo", (todoContent) => {
    console.log("submitting: " + todoContent);
    const activeProjectID = getCurrentUser().getActiveProjectID();
    addTodo(todoContent, activeProjectID);
    //tell everyone data has changed so update the views
    pubsub.publish("data_modified");
  });

  pubsub.subscribe("modify_todo", (id, prop, data) => {
    const parentID = getCurrentUser().getActiveProjectID();
    updateTodo(parentID, id, prop, data);
    //tell detail panel to update its view
  });

  pubsub.subscribe("select_active_todo", (id) => {
    getCurrentUser().setActiveTodo(id);
    pubsub.publish("request_todoDetailsPanel_update");
  });
})();

export { todoListPanel_controller };
