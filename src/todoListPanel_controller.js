var pubsub = require("pubsub.js");

import { todoPanel } from "./todoListPanel_view";
import { getFolderByID } from "./todoModel";
import { getCurrentUser } from "./userModel";

const todoListPanel_controller = (() => {
  pubsub.subscribe("request_todoListPanel_update", () => {
    console.log("processing todoList update!");
    const activeProject = getCurrentUser().getActiveProject();
    const myProject = getFolderByID(activeProject);
    todoPanel.render(myProject.title, myProject.children);
  });
})();

export { todoListPanel_controller };
