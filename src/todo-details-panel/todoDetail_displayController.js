import todoDataModule from "../data/todoDataModule";
import userSession from "../data/userSession";
import generateDefaultMessage from "./components/generateDefaultMessage";
import generateDatePicker from "./components/generateDatePicker";
import generateCheckbox from "./components/generateCheckbox";
import generatePriorityIcon from "./components/generatePriorityIcon";
import generateTodoNameField from "./components/generateTodoNameField";
import generateTodoDescriptionField from "./components/generateTodoDescriptionField";
import "./todoDetail_style.scss";

const todoDetail_displayController = (() => {
  function render() {
    const activeTodoID = userSession.getActiveTodoId();

    if (activeTodoID === "" || activeTodoID == null) {
      renderDefaultMessage();
    } else renderActiveTodo();
  }

  function renderDefaultMessage() {
    const container = document.body.querySelector(".detail-panel");
    container.innerHTML = "";
    const defaultMessageHTML = generateDefaultMessage();
    container.appendChild(defaultMessageHTML);
  }

  function renderActiveTodo() {
    const container = document.body.querySelector(".detail-panel");
    container.innerHTML = "";
    const activeTodoID = userSession.getActiveTodoId();
    const activeTodoObject = todoDataModule.getByID(activeTodoID);
    const topDiv = document.createElement("div");
    const checkbox = generateCheckbox(activeTodoObject);
    const datePicker = generateDatePicker(activeTodoObject);
    const priority = generatePriorityIcon(activeTodoObject);
    const todoNameField = generateTodoNameField(activeTodoObject);
    const todoDescriptionField = generateTodoDescriptionField(activeTodoObject);

    topDiv.classList.add("todo-date");

    topDiv.appendChild(checkbox);
    topDiv.appendChild(datePicker);
    topDiv.appendChild(priority);
    container.appendChild(topDiv);
    container.appendChild(todoNameField);
    container.appendChild(todoDescriptionField);
  }

  return { render };
})();

export default todoDetail_displayController;
