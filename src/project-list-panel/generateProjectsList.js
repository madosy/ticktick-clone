import { generateProjectsHeader } from "./component-generators/generateProjectsHeader";
import generateProjectHtml from "./component-generators/generateProjectHtml";
import projectList from "../data/project/projectList";
import todoDataModule from "../data/todoDataModule";

const generateProjectsList = () => {
  localStorage.clear();
  todoDataModule.project.add("Black Jack's Daily Todo");
  todoDataModule.project.add("My hungry food list");

  const container = document.createElement("div");
  const projectHeader = generateProjectsHeader();
  container.appendChild(projectHeader);

  const myProjectsObject = todoDataModule.project.getAll();
  const myProjectsList = projectList.get();
  myProjectsList.forEach((projectID) => {
    const singleProject = myProjectsObject[projectID];
    const generatedHTML = generateProjectHtml(singleProject);
    container.appendChild(generatedHTML);
  });

  return container;
};

export default generateProjectsList;
