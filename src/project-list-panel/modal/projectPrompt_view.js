import "../styles/folder-prompt.scss";
import { getInboxFolder } from "../data/todoModel";
var pubsub = require("pubsub.js");

const projectPrompt = (() => {
  function newProject() {
    const prompt = generatePrompt("proj_add");
    document.body.appendChild(prompt);
  }

  function deleteProject(projectID) {
    const prompt = generatePrompt("proj_delete");
    prompt.querySelector(".header").innerText = "Delete Project";

    const description = document.createElement("div");
    description.classList.add("description");
    description.innerText =
      "All tasks in this project will be permanently deleted";
    prompt.querySelector("input").replaceWith(description);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("type", "submit");
    deleteButton.addEventListener("click", () => {
      pubsub.publish("proj_delete", [projectID]);
      prompt.remove();
    });
    prompt.querySelector(".save-button").replaceWith(deleteButton);

    if (projectID == getInboxFolder().id) {
      description.innerText = "You cannot delete the inbox folder...";
      deleteButton.disabled = true;
    }

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

  const promptContainerFactory = () => {
    const div = document.createElement("div");
    div.classList.add("prompt");
  };

  const saveButtonFactory = () => {
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save-button");
    saveButton.setAttribute("type", "submit");
    saveButton.disabled = true;

    const save = () => {
      pubsub.publish(publishOption, [projectNameField.value]);
      overlay.remove();
    };

    saveButton.addEventListener("click", save);
    projectNameField.addEventListener("keydown", (event) => {
      if (event.code == "Enter" && saveButton.disabled == false) {
        save();
      }
    });
  };

  const cancelButtonFactory = () => {
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.textContent = "Cancel";
    const prompt = document.querySelector(".prompt");
    cancelButton.addEventListener("click", () => {
      prompt.remove();
    });
  };

  class Prompt {
    constructor() {
      this.header = "";
      this.description = "";
      this.hasInput = false;
      this.inputDefaultText = "";
      this.hasSubmit = true;
      this.submitButtonText = "Save";
      this.hasDelete = false;
    }

    set header(newHeaderText) {
      this.header = newHeaderText;
    }
    set inputDefaultText(newDefaultText) {
      this.inputDefaultText = newDefaultText;
    }
    set submitButtonText(newSubmitText) {
      this.submitButtonText = newSubmitText;
    }
    set submitAction(someFunction) {
      this.submitAction = someFunction;
    }

    render() {
      const container = document.createElement("div");
      const title = document.createElement("div");
      const description = document.createElement("div");
      if (this.hasInput) {
        const input = document.createElement("input");
        input.setAttribute("placeholder", this.inputDefaultText);
      }
      const cancelButton = document.createElement("button");
      if (this.hasSubmit) {
        const submitButton = document.createElement("button");
        submitButton.innerText = this.submitButtonText;
        submitButton.disabled = true;
      }
      if (this.hasDelete) {
        const deleteButton = document.createElement("button");
      }

      submitButton.addEventListener("click", submitAction);
      input.addEventListener("keydown", (event) => {
        if (event.code == "Enter" && saveButton.disabled == false) {
          submitAction();
        }
      });
    }
  }

  return { modifyProject, newProject, deleteProject };
})();

export { projectPrompt };
