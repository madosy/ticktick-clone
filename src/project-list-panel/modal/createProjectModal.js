import "./modal-style.scss";

const createProjectModal = (() => {
  const myModal = document.createElement("dialog");
  const title = document.createElement("div");
  const form = document.createElement("form");
  const input = document.createElement("input");
  const cancelButton = document.createElement("button");
  const submitButton = document.createElement("button");

  myModal.classList.add("add-project");
  title.classList.add("title");
  title.innerText = "Create Project";
  form.setAttribute("formmethod", "dialog");
  input.setAttribute("type", "text");
  cancelButton.innerText = "Cancel";
  submitButton.innerText = "Submit";
  submitButton.setAttribute("type", "submit");

  form.appendChild(input);
  form.appendChild(cancelButton);
  form.appendChild(submitButton);

  myModal.appendChild(title);
  myModal.appendChild(form);

  const modalContainer = document.querySelector("#modal-container");
  modalContainer.appendChild(myModal);

  const show = () => myModal.showModal();

  return { show };
})();

export default createProjectModal;
