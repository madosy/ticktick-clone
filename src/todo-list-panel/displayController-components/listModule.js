import format from "date-fns/format";
import { getObjectFromKeys } from "../../data/helper/getObjectFromKeys";
import todoDataModule from "../../data/todoDataModule";
import userSession from "../../data/userSession";
import generateTodoHTML from "./generateTodoHTML";

const listModule = (() => {
  update();

  function update() {
    const container = document.querySelector(".todo-list");
    container.innerHTML = "";
    const listOfTodoKeys = getTodoKeysToRender();
    listOfTodoKeys.forEach((key) => {
      const generatedHTML = generateTodoHTML(key);
      container.appendChild(generatedHTML);
    });
  }

  function getTodoKeysToRender() {
    const activeProjectId = userSession.getActiveProjectId();
    const listOfTodoKeys = todoDataModule.getByID(activeProjectId).children;
    return listOfTodoKeys;
  }

  return { update };
})();

export default listModule;
