const pubsub = require("pubsub.js");

import { detailsPanel } from "./todoDetailsPanel_view";
import { getTodoByID } from "./todoModel";
import { getCurrentUser } from "./userModel";

const todoDetailsPanel_controller = (() => {
  pubsub.subscribe("request_todoDetailsPanel_update", () => {
    detailsPanel.render();
  });
})();

export { todoDetailsPanel_controller };
