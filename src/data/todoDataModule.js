import getAllProjects from "./project/getListOfAllProjectsFromLocalStorage";
import addProject from "./project/addProject";
import removeProject from "./project/removeProject";
import { getObjectFromKeys } from "./helper/getObjectFromKeys";

const todoDataModule = (() => {
  return {
    project: {
      getAll: getAllProjects,
      add: addProject,
      remove: removeProject,
    },
    todo: {
      add: (todoName) => {},
      remove: (todoID) => {},
    },
    getByID: getObjectFromKeys,
  };
})();

export default todoDataModule;
