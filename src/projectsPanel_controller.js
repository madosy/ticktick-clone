var pubsub = require("pubsub.js");

import { projectPrompt } from "./projectPrompt_view";

const projectsPanel_controller = (() => {
  pubsub.subscribe("request_proj_add", () => {
    projectPrompt.newProject();
  });
})();

export { projectsPanel_controller };
