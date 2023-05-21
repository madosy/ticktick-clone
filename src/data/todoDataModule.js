import getAllProjects from "./project/getListOfAllProjectsFromLocalStorage";
import addProject from "./project/addProject";
import removeProject from "./project/removeProject";
import getByID from "./helper/getByID";

const todoDataModule = (() => {
  return {
    project: {
      getAll: getAllProjects,
      add: addProject,
      remove: removeProject,
      modify: (projectID, value) => {},
    },
    todo: {
      add: (todoName) => {},
      remove: (todoID) => {},
    },
    getByID,
  };
})();

export default todoDataModule;
