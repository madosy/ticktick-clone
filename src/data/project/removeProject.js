import projectList from "./projectList";

function removeProject(projectId) {
  projectList.remove(projectId);
  localStorage.removeItem(projectId);
}

export default removeProject;
