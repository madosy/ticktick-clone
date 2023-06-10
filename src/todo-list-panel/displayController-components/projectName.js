import todoDataModule from "../../data/todoDataModule";
import userSession from "../../data/userSession";
import modifyProjectModal from "../../project-list-panel/modal/modifyProjectModal";

const activeProjectName = (() => {
  update();

  function update() {
    const titleContainer = document.querySelector(".project-name");
    const projectName = document.createElement("span");
    const modifyProjectButton = generateModifyButton();
    titleContainer.innerHTML = "";
    projectName.innerText = getActiveProjectName();
    titleContainer.appendChild(projectName);
    if (userSession.getActiveProjectId().startsWith("tictoc.project")) {
      titleContainer.appendChild(modifyProjectButton);
    }
  }

  function generateModifyButton() {
    const modifyProjectButton = document.createElement("button");
    modifyProjectButton.classList.add("modify-project");
    modifyProjectButton.classList.add("material-symbols-outlined");
    modifyProjectButton.innerText = "edit";
    modifyProjectButton.onclick = () => modifyProjectModal.show();
    return modifyProjectButton;
  }

  function getActiveProjectName() {
    const activeProjectID = userSession.getActiveProjectId();
    const activeProjectName = todoDataModule.getByID(activeProjectID).name;
    return activeProjectName;
  }

  return { update, get: getActiveProjectName };
})();

export default activeProjectName;
