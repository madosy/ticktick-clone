import { defaultInbox } from "./defaultSessionComponents";

const userSession = (() => {
  const isInitialized = JSON.parse(localStorage.getItem("initialized"));
  initialize();

  function initialize() {
    localStorage.setItem("initialized", true);
    localStorage.setItem(defaultInbox.id, JSON.stringify(defaultInbox));
  }
  function getActiveProjectId() {
    localStorage.getItem("tictoc.activeProject");
  }
  function setActiveProjectId(projectId) {
    localStorage.setItem("tictock.activeProject", projectId);
    console.log(`Active project is now: ${projectId}`);
  }
  function getActiveTodoId() {
    localStorage.getItem("tictoc.activeTodo");
  }
  function setActiveTodoId(todoId) {
    localStorage.setItem("tictoc.activeTodo", todoId);
  }

  return {
    getActiveProjectId,
    setActiveProjectId,
    getActiveTodoId,
    setActiveTodoId,
  };
})();

export default userSession;
