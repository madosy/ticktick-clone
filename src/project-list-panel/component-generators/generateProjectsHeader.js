function generateProjectsHeader() {
  const projectHeader = document.createElement("div");
  projectHeader.classList.add("header");
  projectHeader.innerHTML = `Projects <span class="add">+</span>`;
  const addButton = projectHeader.querySelector("span.add");

  addButton.addEventListener("click", () => {
    pubsub.publish("display_proj_add_prompt");
  });

  return projectHeader;
}

export { generateProjectsHeader };
