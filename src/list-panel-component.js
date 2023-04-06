var pubsub = require("pubsub.js");

const listPanel = (() => {
  const listPanel = document.body.querySelector(".list-panel");

  function render(projectsArray) {
    listPanel.innerHTML = `<div class="header">Projects <span class="add">+</span></div>`;
    projectsArray.forEach((project) => {
      const renderedItem = renderItem(project);
      listPanel.appendChild(renderedItem);
    });
    pubsub.publish("render list panel");
  }

  const renderItem = ({ id, title, count }) => {
    const item = document.createElement("div");
    item.classList.add("list");
    item.dataset.id = id;
    item.innerHTML = `
  <span class="material-symbols-outlined">folder</span>
  <span class="title">${title}</span>
  <span class="count">${count}</span>`;
    return item;
  };

  return { render };
})();

export { listPanel };
