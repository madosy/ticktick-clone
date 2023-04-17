const userFactory = () => {
  const id = "user" + Math.random();
  let activeProject;
  let activeTodo;

  function setActiveProject(id) {
    activeProject = id;
    console.log("my active project is now: " + activeProject);
  }

  function getActiveProject() {
    return activeProject;
  }

  function getActiveTodo() {
    return activeTodo;
  }

  return { getActiveProject, getActiveTodo, setActiveProject };
};

const defaultUser = userFactory();
let currentUser = defaultUser;

export function getCurrentUser() {
  return currentUser;
}
