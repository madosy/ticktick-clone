import userSession from "../../data/userSession";

const generateProjectHtml = (projectObject) => {
  const projectId = projectObject.id;
  const projectName = projectObject.name;
  const projectChildrenCount = projectObject.count;

  const container = document.createElement("div");
  const icon = document.createElement("span");
  const name = document.createElement("span");
  const count = document.createElement("span");

  container.classList.add("project");
  container.addEventListener("click", () => {
    userSession.setActiveProjectId(projectId);
  });

  icon.classList.add("material-symbols-outlined");
  icon.innerText = "folder";

  name.classList.add("name");
  name.innerText = projectName;

  count.classList.add("count");
  count.innerText = projectChildrenCount;

  container.appendChild(icon);
  container.appendChild(name);
  container.appendChild(count);
  return container;
};

export default generateProjectHtml;

// projectsArray.forEach((project) => {
//   const renderedItem = renderItem(project);
//   renderedItem.addEventListener("click", (e) => {
//     pubsub.publish("select_active_proj", [
//       e.target.closest(".project").dataset.id,
//     ]);
//   });
//   renderedItem.addEventListener("dblclick", (e) => {
//     pubsub.publish("request_proj_modify", [
//       e.target.closest(".project").dataset.id,
//     ]);
//   });
//   renderedItem.addEventListener("contextmenu", (e) => {
//     e.preventDefault();
//     displayContextMenu(e);
//   });
//   container.appendChild(renderedItem);
// });
//   pubsub.publish("render list panel");
// }
