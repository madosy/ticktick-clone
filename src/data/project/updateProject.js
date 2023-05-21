function updateProject(projectObject) {
  const projectId = projectObject.id;
  localStorage.setItem(projectId, JSON.stringify(projectObject));
}

export default updateProject;
