const userFactory = () => {
  const id = "user" + Math.random();
  let activeProject;
  let activeTodo;

  function setActiveProject(id) {
    activeProject = id;
  }
  function setActiveTodo(id) {
    activeTodo = id;
  }
  function getActiveProjectID() {
    return activeProject;
  }
  function getActiveTodoID() {
    return activeTodo;
  }

  return {
    getActiveProjectID,
    getActiveTodoID,
    setActiveProject,
    setActiveTodo,
  };
};

const defaultUser = userFactory();
let currentUser = defaultUser;

export function getCurrentUser() {
  return currentUser;
}

console.log(currentUser);
