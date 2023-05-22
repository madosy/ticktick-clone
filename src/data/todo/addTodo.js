import { generateRandomNumberInString as randomNumString } from "../helper/generateRandomNumberInString";
import todoDataModule from "../todoDataModule";
import userSession from "../userSession";

function addTodo(newTodoName) {
  const newTodo = createNewTodo(newTodoName);
  saveTodoToLocalStorage(newTodo);
  addTodoToParentList(newTodo.id);
  console.log(newTodo);

  function createNewTodo(todoName) {
    const generatedID = `tictoc.todo_${randomNumString()}`;
    const newTodo = {
      name: todoName,
      id: generatedID,
      checked: false,
      description: "",
      priority: undefined,
      dueDate: undefined,
    };
    return newTodo;
  }

  function saveTodoToLocalStorage(newTodo) {
    localStorage.setItem(newTodo.id, JSON.stringify(newTodo));
  }

  function addTodoToParentList(todoID) {
    //getactiveprojectid
    const activeProjectId = userSession.getActiveProjectId();
    const activeProject = todoDataModule.getByID(activeProjectId);
    activeProject.children.push(todoID);
    todoDataModule.project.update(activeProject);

    //addchildtoactiveproject
  }
}

export default addTodo;
