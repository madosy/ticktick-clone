import { format, parseISO } from "date-fns";
import todoDataModule from "../../data/todoDataModule";
import userSession from "../../data/userSession";

const generateTodoHTML = (todoID) => {
  const todoObject = todoDataModule.getByID(todoID);
  const container = document.createElement("div");
  const checkbox = document.createElement("input");
  const name = document.createElement("div");
  const dueDate = document.createElement("span");
  const description = document.createElement("p");
  const isDueDateSet = (todoObject) => todoObject.dueDate !== undefined;
  const isDescriptionSet = (todoObject) => todoObject.description !== undefined;
  const deleteIcon = document.createElement("span");

  container.classList.add("todo");
  container.dataset.priority = todoObject.todoPriority;
  container.addEventListener("click", () => userSession.setActiveTodoId(todoID));

  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("todo-checkbox");
  checkbox.checked = todoObject.checked;
  checkbox.addEventListener("input", () => {
    const checkboxStatus = checkbox.checked;
    todoObject.checked = checkboxStatus;
    todoDataModule.todo.update(todoObject);
  });

  name.textContent = todoObject.name;
  name.classList.add("name");
  name.setAttribute("contenteditable", true);
  name.addEventListener("input", () => {
    const newName = name.textContent;
    todoObject.name = newName;
    todoDataModule.todo.update(todoObject);
  });

  dueDate.classList.add("dueDate");
  if (isDueDateSet) {
    dueDate.textContent = formatDate(todoObject.dueDate);
  }

  description.classList.add("details");
  if (isDescriptionSet) {
    const descriptionHTML = document.createElement("div");
    descriptionHTML.innerHTML = todoObject.description;
    const descriptionText = descriptionHTML.textContent;
    description.textContent = descriptionText;
  }
  const descriptionLength = description.textContent.length;

  deleteIcon.classList.add("material-symbols-outlined");
  deleteIcon.classList.add("delete-todo-icon");
  deleteIcon.innerText = "delete";
  deleteIcon.addEventListener("click", (event) => {
    todoDataModule.todo.remove(todoID);
    userSession.setActiveTodoId("");
    event.stopPropagation();
  });

  container.appendChild(checkbox);
  container.appendChild(name);
  container.appendChild(dueDate);
  container.appendChild(deleteIcon);

  if (descriptionLength > 0) container.appendChild(description);

  return container;
};

export default generateTodoHTML;

function formatDate(date) {
  if (date === null) return;
  const currentYear = new Date().getFullYear();
  const parsedDate = parseISO(date);
  const todoYear = parsedDate.getFullYear();
  let dateString = "";
  if (todoYear < currentYear || todoYear > currentYear) {
    dateString = format(parsedDate, "MMM d, yyyy");
  } else dateString = format(parsedDate, "MMM d");

  return dateString;
}
