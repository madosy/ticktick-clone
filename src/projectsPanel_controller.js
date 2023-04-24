var pubsub = require("pubsub.js");

import { projectPrompt } from "./projectPrompt_view";
import { projectsPanel } from "./projectsPanel_view";
import { DeletionPrompt } from "./Prompt";
import {
  addFolder,
  getProjectByID,
  getAllProjects,
  updateProjectName,
  deleteProject,
  getInboxFolder,
} from "./todoModel";
import { getCurrentUser } from "./userModel";

const projectsPanel_controller = (() => {
  pubsub.subscribe("request_projectsPanel_update", () => {
    projectsPanel.render(getAllProjects());
  });

  pubsub.subscribe("select_active_proj", (id) => {
    getCurrentUser().setActiveProject(id);
    getCurrentUser().setActiveTodo(undefined);
    pubsub.publish("request_todoListPanel_update");
    pubsub.publish("request_todoDetailsPanel_update");
  });

  pubsub.subscribe("request_proj_modify", (id) => {
    if (id == getInboxFolder().id) return;

    const myFolder = getProjectByID(id);
    projectPrompt.modifyProject(myFolder.title);
  });

  pubsub.subscribe("proj_modify", (newFolderName) => {
    console.log("project's new name is now: " + newFolderName);
    const projectID = getCurrentUser().getActiveProjectID();

    updateProjectName(projectID, newFolderName);
    //announce to all views that data was modified.
    pubsub.publish("request_projectsPanel_update");
    pubsub.publish("request_todoListPanel_update");
  });

  pubsub.subscribe("display_proj_add_prompt", () => {
    projectPrompt.newProject();
  });

  pubsub.subscribe("proj_add", (newFolderName) => {
    console.log("new folder to add: " + newFolderName);
    addFolder(newFolderName);
    //announce to all views that data was modified.
    pubsub.publish("data_modified");
  });

  pubsub.subscribe("display_proj_delete_prompt", (id) => {
    projectPrompt.deleteProject(id);

    // const projectForDeletion = getProjectByID(id);
    // const projectDeletionPrompt = new DeletionPrompt(id);
    // projectDeletionPrompt.render();
  });

  pubsub.subscribe("proj_delete", (id) => {
    console.log("folder to delete: " + id);
    deleteProject(id);
    pubsub.publish("request_projectsPanel_update");
  });
})();

export { projectsPanel_controller };
