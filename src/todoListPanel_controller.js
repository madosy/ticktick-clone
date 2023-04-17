var pubsub = require("pubsub.js");

import { todoPanel } from "./todoListPanel_view";
import { getProjectByID } from "./todoModel";
import { getCurrentUser } from "./userModel";

const todoListPanel_controller = (() => {
  pubsub.subscribe("request_todoListPanel_update", () => {
    const activeProject = getCurrentUser().getActiveProject();
    const myProject = getProjectByID(activeProject);
    todoPanel.render(myProject.title, myProject.children);
  });
})();

export { todoListPanel_controller };
