const projectList = (() => {
  function getProjectsListArray() {
    const isProjectListInitialized = () => localStorage.getItem("tictoc.project-list") !== null;
    const initializeProjectList = () => localStorage.setItem("tictoc.project-list", "[]");

    if (!isProjectListInitialized()) initializeProjectList();
    const rawProjectsArrayData = localStorage.getItem("tictoc.project-list");
    const projectsArray = JSON.parse(rawProjectsArrayData);
    return projectsArray;
  }

  const addProjectIdToList = (projectId) => {
    const projectsArray = getProjectsListArray();
    projectsArray.push(projectId);
    localStorage.setItem("tictoc.project-list", JSON.stringify(projectsArray));
  };

  const removeProjectFromList = (projectId) => {
    const projectsArray = getProjectsListArray();
    const removeIndex = projectsArray.indexOf(projectId);
    projectsArray.splice(removeIndex, 1);
    localStorage.setItem("tictoc.project-list", JSON.stringify(projectsArray));
  };

  return {
    get: getProjectsListArray,
    add: addProjectIdToList,
    remove: removeProjectFromList,
  };
})();

export default projectList;
