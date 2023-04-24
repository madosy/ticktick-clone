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

  render() {}

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
}

class ModificationPrompt extends Prompt {}
class DeletionPrompt {
  constructor(id) {
    this.header = "Delete Project";
    this.description = "All tasks in this project will be permanently deleted";
    this.id = id;
  }
  render() {
    const container = PromptComponentFactory.container(this.id);
    const title = PromptComponentFactory.title(this.header);

    const description = PromptComponentFactory.description(this.description);
    const cancelButton = PromptComponentFactory.cancelButton();
    const deleteButton = PromptComponentFactory.deleteButton();
    [title, description, cancelButton, deleteButton].forEach((domElement) =>
      container.appendChild(domElement)
    );
    document.body.appendChild(container);
  }
}

const PromptComponentFactory = (() => {
  function container(id) {
    const container = document.createElement("div");
    container.dataset.id = id;
    container.classList.add("prompt");
    return container;
  }
  function title(text) {
    const title = document.createElement("div");
    title.textContent = text;
    return title;
  }
  function description(text) {
    const description = document.createElement("div");
    description.textContent = text;
    return description;
  }
  function input(populatedText) {
    const input = document.createElement("input");
    input.value = populatedText;
    return input;
  }
  function cancelButton() {
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", () =>
      pubsub.publish("remove_prompt")
    );
    return cancelButton;
  }
  function deleteButton(id) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () =>
      pubsub.publish("delete_project", [{ id }])
    );
    return deleteButton;
  }
  function saveButton() {
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.disabled = true;
    return saveButton;
  }
  const activateButtonOnInput = (input, button, someFunction) => {
    button.addEventListener("click", someFunction);
    input.addEventListener("keydown", (event) => {
      if (event.code == "Enter" && button.disabled == false) someFunction();
    });
  };

  return {
    container,
    title,
    description,
    input,
    cancelButton,
    deleteButton,
    saveButton,
    activateButtonOnInput,
  };
})();

export { DeletionPrompt };
