import { getInboxFolder } from "../data/todoModel";

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
      renderedItem.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        displayContextMenu(e);
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
      pubsub.publish("display_proj_add_prompt");
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

  const displayContextMenu = (e) => {
    const id = e.target.closest(".project").dataset.id;
    if (id == getInboxFolder().id) {
      return;
    }

    const existingMenu = document.body.querySelector(".contextmenu");
    if (existingMenu) existingMenu.remove();
    const x = e.x + "px";
    const y = e.y + "px";

    const contextmenu = document.createElement("div");
    contextmenu.classList.add("contextmenu");
    contextmenu.style.left = x;
    contextmenu.style.top = y;

    const modify_button = document.createElement("button");
    modify_button.textContent = "Modify";
    modify_button.addEventListener("click", () => {
      pubsub.publish("request_proj_modify", [id]);
    });
    const delete_button = document.createElement("button");
    delete_button.textContent = "Delete";
    delete_button.addEventListener("click", () => {
      pubsub.publish("display_proj_delete_prompt", [id]);
    });

    contextmenu.appendChild(modify_button);
    contextmenu.appendChild(delete_button);

    document.body.addEventListener("click", () => contextmenu.remove());
    document.body.appendChild(contextmenu);
  };

  return { render };
})();

export { projectsPanel };
