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

// const _dueDate = document.createElement("span");
// _dueDate.classList.add("dueDate");
// _dueDate.textContent = formatDate(dueDate);

// const formatDate = (date) => {
// if (date == undefined) return;
// const currentYear = new Date().getFullYear();
// const todoYear = date.getFullYear();
// if (todoYear < currentYear) {
//   return format(date, "MMM d, yyyy");
// } else {
//   return format(date, "MMM d");
// }
// };
