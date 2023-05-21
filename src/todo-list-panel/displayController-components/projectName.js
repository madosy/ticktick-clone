import todoDataModule from "../../data/todoDataModule";
import userSession from "../../data/userSession";

const activeProjectName = (() => {
  update();

  function update() {
    const titleContainer = document.querySelector(".project-name");
    const activeProjectName = getActiveProjectName();
    titleContainer.innerText = activeProjectName;
  }

  function getActiveProjectName() {
    const activeProjectID = userSession.getActiveProjectId();
    const activeProjectName = todoDataModule.getByID(activeProjectID).name;
    return activeProjectName;
  }

  return { update, get: getActiveProjectName };
})();

export default activeProjectName;
