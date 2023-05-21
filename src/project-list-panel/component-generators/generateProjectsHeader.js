import createProjectModal from "../modal/createProjectModal";

function generateProjectsHeader() {
  const projectHeader = document.createElement("div");
  projectHeader.classList.add("header");
  projectHeader.innerHTML = `Projects <span class="add">+</span>`;
  const addButton = projectHeader.querySelector("span.add");

  addButton.addEventListener("click", () => {
    createProjectModal.show();
  });

  return projectHeader;
}

export { generateProjectsHeader };
