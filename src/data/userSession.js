import { defaultInbox } from "./defaultSessionComponents";
import PubSub from "pubsub-js";

const userSession = (() => {
  const isInitialized = () => JSON.parse(localStorage.getItem("initialized"));
  if (!isInitialized()) initialize();

  function initialize() {
    console.log("im initializing my inbox");
    localStorage.setItem("initialized", true);
    localStorage.setItem(defaultInbox.id, JSON.stringify(defaultInbox));
    setActiveProjectId(defaultInbox.id);
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
