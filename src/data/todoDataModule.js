import getAllProjects from "./project/getListOfAllProjectsFromLocalStorage";
import addProject from "./project/addProject";
import removeProject from "./project/removeProject";
import getByID from "./helper/getByID";
import updateProject from "./project/updateProject";
import addTodo from "./todo/addTodo";
import updateTodo from "./todo/updateTodo";
import removeTodo from "./todo/removeTodo";

const todoDataModule = (() => ({
  project: {
    getAll: getAllProjects,
    add: addProject,
    remove: removeProject,
    update: updateProject,
  },
  todo: {
    add: addTodo,
    remove: removeTodo,
    update: updateTodo,
  },
  getByID,
}))();

export default todoDataModule;
