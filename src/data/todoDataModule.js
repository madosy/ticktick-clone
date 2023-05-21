import getAllProjects from "./project/getListOfAllProjectsFromLocalStorage";
import addProject from "./project/addProject";
import removeProject from "./project/removeProject";
import getByID from "./helper/getByID";
import updateProject from "./project/updateProject";
import addTodo from "./todo/addTodo";

const todoDataModule = (() => {
  return {
    project: {
      getAll: getAllProjects,
      add: addProject,
      remove: removeProject,
      update: updateProject,
    },
    todo: {
      add: addTodo,
      remove: (todoID) => {},
    },
    getByID,
  };
})();

export default todoDataModule;
