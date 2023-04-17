import "./styles/folder-prompt.scss";

const projectPrompt = (() => {
  function newProject() {
    const header = document.createElement("h1");
    header.textContent = "Add Project";
    const titleField = document.createElement("input");
    titleField.setAttribute("placeholder", "Project Name");

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.textContent = "Cancel";
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save-button");
    saveButton.setAttribute("type", "submit");
    saveButton.disabled = true;
    const buttonContainer = document.createElement("div");
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(saveButton);

    const formContainer = document.createElement("div");
    formContainer.appendChild(header);
    formContainer.appendChild(titleField);
    formContainer.appendChild(buttonContainer);
    formContainer.classList.add("form");

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.appendChild(formContainer);
    document.body.appendChild(overlay);
  }

  // const newFolder_clickHandler = () => {
  //   const addButton = document.querySelector(
  //     "div.list-panel > div.header > span.add"
  //   );
  //   addButton.addEventListener("click", () => {
  //     newFolderPrompt();
  //     const titleField = document.querySelector(".form > input");
  //     const saveButton = document.querySelector(".save-button");
  //     const cancelButton = document.querySelector(".cancel-button");
  //     const overlay = document.querySelector(".overlay");

  //     titleField.addEventListener("input", () => {
  //       if (titleField.value.length > 0) {
  //         saveButton.disabled = false;
  //       } else saveButton.disabled = true;
  //     });
  //     cancelButton.addEventListener("click", () => {
  //       overlay.remove();
  //     });
  //     const submit = () => {
  //       const folderTitle = titleField.value;
  //       addFolder(folderTitle);
  //       listPanel.render(getProjects());
  //       newFolder_clickHandler();
  //       overlay.remove();
  //     };
  //     saveButton.addEventListener("click", submit);
  //     titleField.addEventListener("keydown", (e) => {
  //       if (e.keyCode == 13 && saveButton.disabled == false) submit();
  //     });
  //   });
  // };
  return { newProject };
})();

export { projectPrompt };
