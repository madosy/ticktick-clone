var pubsub = require("pubsub.js");

import { projectPrompt } from "./projectPrompt_view";
import { getProjectByID } from "./todoModel";
import { getCurrentUser } from "./userModel";

const projectsPanel_controller = (() => {
  pubsub.subscribe("select_active_proj", (id) => {
    getCurrentUser().setActiveProject(id);
    pubsub.publish("request_todoListPanel_update");
  });

  pubsub.subscribe("request_proj_modify", (id) => {
    const myFolder = getProjectByID(id);
    projectPrompt.modifyProject(myFolder.title);
  });

  pubsub.subscribe("proj_modify", (newFolderName) => {
    console.log("project's new name is now: " + newFolderName);
    //tell todoModel to update data accordingly.
    //announce to all views that data was modified.
  });

  pubsub.subscribe("request_proj_add", () => {
    projectPrompt.newProject();
  });

  pubsub.subscribe("proj_add", (newFolderName) => {
    console.log("new folder to add: " + newFolderName);
    //tell todoModel to add project data.
    //announce to all views that data was modified.
  });
})();

export { projectsPanel_controller };
