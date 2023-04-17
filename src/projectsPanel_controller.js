var pubsub = require("pubsub.js");

import { projectPrompt } from "./projectPrompt_view";
import { getFolderByID } from "./todoModel";

const projectsPanel_controller = (() => {
  pubsub.subscribe("request_proj_modify", (id) => {
    const myFolder = getFolderByID(id);
    projectPrompt.modifyProject(myFolder.title);
  });

  pubsub.subscribe("proj_modify", (newFolderName) => {
    console.log("project's new name is now: " + newFolderName);
  });

  pubsub.subscribe("request_proj_add", () => {
    projectPrompt.newProject();
  });

  pubsub.subscribe("new_folder_submit", (newFolderName) => {
    console.log("new folder to add: " + newFolderName);
  });
})();

export { projectsPanel_controller };
