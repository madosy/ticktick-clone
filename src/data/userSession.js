import { defaultInbox } from "./defaultSessionComponents";

const userSession = (() => {
  const isInitialized = JSON.parse(localStorage.getItem("initialized"));
  initialize();

  function initialize() {
    localStorage.setItem("initialized", true);
    localStorage.setItem(defaultInbox.id, JSON.stringify(defaultInbox));
  }
  function getActiveProjectId() {
    localStorage.getItem("activeProjectId");
  }
  function setActiveProjectId(projectId) {
    localStorage.setItem("activeProjectId", projectId);
  }
  function getActiveTodoId() {
    localStorage.getItem("activeTodoId");
  }
  function setActiveTodoId(todoId) {
    localStorage.setItem("activeTodoId", todoId);
  }

  return {
    getActiveProjectId,
    setActiveProjectId,
    getActiveTodoId,
    setActiveTodoId,
  };
})();

export { userSession };
