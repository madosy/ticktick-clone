var pubsub = require("pubsub.js");

const projectsPanel = (() => {
  const container = document.body.querySelector(".list-panel");

  function render(projectsArray) {
    container.innerHTML = "";
    container.appendChild(generateHeader());

    projectsArray.forEach((project) => {
      const renderedItem = renderItem(project);
      renderedItem.addEventListener("click", (e) => {
        pubsub.publish("select_active_proj", [
          e.target.closest(".project").dataset.id,
        ]);
      });
      renderedItem.addEventListener("dblclick", (e) => {
        pubsub.publish("request_proj_modify", [
          e.target.closest(".project").dataset.id,
        ]);
      });
      container.appendChild(renderedItem);
    });
    pubsub.publish("render list panel");
  }

  const generateHeader = () => {
    const projectHeader = document.createElement("div");
    projectHeader.innerHTML = `<div class="header">Projects <span class="add">+</span></div>`;
    const addButton = projectHeader.querySelector("span.add");
    addButton.addEventListener("click", () => {
      pubsub.publish("request_proj_add");
      console.log("request_proj_add");
    });
    return projectHeader;
  };

  const renderItem = ({ id, title, count }) => {
    const item = document.createElement("div");
    item.classList.add("project");
    item.dataset.id = id;
    item.innerHTML = `
  <span class="material-symbols-outlined">folder</span>
  <span class="title">${title}</span>
  <span class="count">${count}</span>`;
    return item;
  };

  return { render };
})();

export { projectsPanel };
