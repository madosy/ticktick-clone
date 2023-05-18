function generateProjectsHeader() {
  const projectHeader = document.createElement("div");
  projectHeader.innerHTML = `<div class="header">Projects <span class="add">+</span></div>`;
  const addButton = projectHeader.querySelector("span.add");

  addButton.addEventListener("click", () => {
    pubsub.publish("display_proj_add_prompt");
  });

  return projectHeader;
}

export { generateProjectsHeader };
