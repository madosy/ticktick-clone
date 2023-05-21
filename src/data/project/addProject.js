import projectList from "./projectList";
import { generateRandomNumberInString as randomNumString } from "../helper/generateRandomNumberInString";

function addProject(newProjectName) {
  const newProject = createNewProject(newProjectName);
  saveProjectToLocalStorage(newProject);
  addProjectToList(newProject.id);
  console.log(newProject);

  function createNewProject(projectName) {
    const generatedID = `tictoc.project_${randomNumString()}`;
    const newProject = { name: projectName, id: generatedID, children: [] };
    return newProject;
  }

  function saveProjectToLocalStorage(newProject) {
    localStorage.setItem(newProject.id, JSON.stringify(newProject));
  }

  function addProjectToList(projectID) {
    projectList.add(projectID);
  }
}

export default addProject;
