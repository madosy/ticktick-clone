import projectList from "./projectList";

function removeProject(projectId) {
  localStorage.removeItem(projectId);
  projectList.remove(projectId);
}

export default removeProject;
