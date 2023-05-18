var pubsub = require("pubsub.js");

import todoPanel from "./todoListPanel_displayController";
import { addTodo, getProjectByID, updateTodo } from "../data/todoModel";
import { getCurrentUser } from "../data/userModel";
import { userSession } from "../data/userSession";

const todoListPanel_controller = (() => {
  const getActiveProjectObj = () => {
    // const activeProject = getCurrentUser().getActiveProjectID();
    const activeProject = userSession.getActiveProjectId();
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

  pubsub.subscribe("todoListPanel_modify_todo", (...data) => {
    const parentID = getCurrentUser().getActiveProjectID();
    const todoID = getCurrentUser().getActiveTodoID();
    const content = data.find((item) => item.hasOwnProperty("content")).content;
    const property = data.find((item) => item.hasOwnProperty("prop")).prop;

    updateTodo(parentID, todoID, property, content);
    pubsub.publish("request_todoDetailsPanel_update");
  });

  pubsub.subscribe("modify_todo", (...input) => {
    console.log(...input.filter((item) => item.hasOwnProperty("content")));
    console.log(...input.filter((item) => typeof item == "string"));
  });

  pubsub.subscribe("select_active_todo", (id) => {
    getCurrentUser().setActiveTodo(id);
    pubsub.publish("request_todoDetailsPanel_update");
  });
})();

export { todoListPanel_controller };
