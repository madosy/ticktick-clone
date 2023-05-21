import "./projectsPanel.scss";
import { generateSmartFolderList } from "./generateSmartFolderList";
import generateProjectsList from "./generateProjectsList";
import "./modal/createProjectModal";

const project_displayController = (() => {
  function render() {
    const projectPanel = document.querySelector("div.project-panel");
    const smartFolders = generateSmartFolderList();
    const projectList = generateProjectsList();

    projectPanel.appendChild(smartFolders);
    projectPanel.appendChild(projectList);
  }

  render();

  return { render };
})();

export default { project_displayController };
