import "./styles/folder-prompt.scss";

export default function newFolderPrompt() {
  const header = document.createElement("h1");
  header.textContent = "Add Project";
  const titleField = document.createElement("input");
  titleField.setAttribute("placeholder", "Project Name");

  const cancelButton = document.createElement("button");
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
