import { defaultInbox } from "./defaultSessionComponents";
import PubSub from "pubsub-js";

const userSession = (() => {
  const isInitialized = JSON.parse(localStorage.getItem("initialized"));
  initialize();

  function initialize() {
    localStorage.setItem("initialized", true);
    localStorage.setItem(defaultInbox.id, JSON.stringify(defaultInbox));
  }
  const getActiveProjectId = () => localStorage.getItem("tictoc.activeProject");

  function setActiveProjectId(projectId) {
    localStorage.setItem("tictoc.activeProject", projectId);
    PubSub.publish("data_changed");
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
