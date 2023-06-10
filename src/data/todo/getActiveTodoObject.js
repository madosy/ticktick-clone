import userSession from "../userSession";
import todoDataModule from "../todoDataModule";

function getActiveTodoObject() {
  const activeTodoID = userSession.getActiveTodoId();
  const activeTodoObject = todoDataModule.getByID(activeTodoID);
  return activeTodoObject;
}

export default getActiveTodoObject;
