import todoDataModule from "../../data/todoDataModule";
import userSession from "../../data/userSession";
import "./modal-style.scss";

// put it on hold until i finish implementing the edit button on todo list page.
const modifyProjectModal = (() => {
  const modalContainer = document.querySelector("#modal-container");
  const myModal = document.createElement("dialog");
  const title = document.createElement("div");
  const form = document.createElement("form");
  const input = document.createElement("input");
  const submitButton = document.createElement("button");

  myModal.classList.add("modify-project");
  myModal.addEventListener("click", (e) => {
    const dialogDimensions = myModal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      myModal.close();
    }
  });

  title.classList.add("title");
  title.innerText = "Modify Project";

  form.setAttribute("formmethod", "dialog");
  form.addEventListener("submit", (event) => {
    const activeProjectID = userSession.getActiveProjectId();
    const activeProjectObject = todoDataModule.getByID(activeProjectID);
    activeProjectObject.name = input.value;
    todoDataModule.project.update(activeProjectObject);
  });

  input.setAttribute("type", "text");
  const activeProjectID = userSession.getActiveProjectId();
  const activeProjectObject = todoDataModule.getByID(activeProjectID);
  input.value = activeProjectObject.name;
  input.addEventListener("input", () => {
    if (input.value.length > 0) {
      submitButton.disabled = false;
    } else submitButton.disabled = true;
  });

  submitButton.innerText = "Submit";
  submitButton.setAttribute("type", "submit");
  submitButton.disabled = true;

  const show = () => {
    const activeProjectID = userSession.getActiveProjectId();
    const activeProjectObject = todoDataModule.getByID(activeProjectID);
    input.value = activeProjectObject.name;
    myModal.showModal();
  };

  form.appendChild(input);
  form.appendChild(submitButton);
  myModal.appendChild(title);
  myModal.appendChild(form);
  modalContainer.appendChild(myModal);

  return { show };
})();

export default modifyProjectModal;
