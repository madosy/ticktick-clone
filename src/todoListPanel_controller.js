var pubsub = require("pubsub.js");

import { todoPanel } from "./todoListPanel_view";
import { addTodo, getProjectByID } from "./todoModel";
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
    pubsub.publish("request_todoListPanel_update");
    pubsub.publish("request_projectsPanel_update");
    //tell everyone data has changed so update the views
  });
})();

export { todoListPanel_controller };
