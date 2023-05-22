import todoDataModule from "../todoDataModule";
import userSession from "../userSession";

function removeTodo(todoID) {
  localStorage.removeItem(todoID);
  const activeProjectId = userSession.getActiveProjectId();
  const activeProjectObject = todoDataModule.getByID(activeProjectId);
  const updatedProjectObject = removeTodoFromParent(activeProjectObject, todoID);
  todoDataModule.project.update(updatedProjectObject);
}

export default removeTodo;

function removeTodoFromParent(projectObject, todoID) {
  const childrenArray = projectObject.children;
  const removeIndex = childrenArray.indexOf(todoID);
  childrenArray.splice(removeIndex, 1);
  projectObject.children = childrenArray;
  return projectObject;
}
