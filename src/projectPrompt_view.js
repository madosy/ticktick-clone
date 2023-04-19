import "./styles/folder-prompt.scss";
var pubsub = require("pubsub.js");

const projectPrompt = (() => {
  function newProject() {
    const prompt = generatePrompt();
    document.body.appendChild(prompt);
  }

  function modifyProject(projectName) {
    const prompt = generatePrompt("proj_modify");
    prompt.querySelector(".header").innerText = `Modify Project`;
    prompt.querySelector("input").value = projectName;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("type", "submit");

    document.body.appendChild(prompt);
  }

  const generatePrompt = (publishOption = "proj_add") => {
    const container = document.createElement("div");

    const header = document.createElement("h1");
    header.textContent = "Add Project";
    header.classList.add("header");

    const projectNameField = document.createElement("input");
    projectNameField.setAttribute("placeholder", "Project Name");
    projectNameField.addEventListener("input", () => {
      if (projectNameField.value.length > 0) {
        saveButton.disabled = false;
      } else saveButton.disabled = true;
    });

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", () => {
      overlay.remove();
    });

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save-button");
    saveButton.setAttribute("type", "submit");
    saveButton.disabled = true;

    const submit = () => {
      pubsub.publish(publishOption, [projectNameField.value]);
      overlay.remove();
    };
    saveButton.addEventListener("click", submit);
    projectNameField.addEventListener("keydown", (e) => {
      if (e.code == "Enter" && saveButton.disabled == false) {
        submit();
      }
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(saveButton);

    const form = document.createElement("div");
    form.appendChild(header);
    form.appendChild(projectNameField);
    form.appendChild(buttonContainer);
    form.classList.add("form");

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.appendChild(form);

    return overlay;
  };

  return { modifyProject, newProject };
})();

export { projectPrompt };
