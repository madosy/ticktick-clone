import todoDataModule from "../../data/todoDataModule";
import userSession from "../../data/userSession";
import { format } from "date-fns";

const generateTodoHTML = (todoID) => {
  const todoObject = todoDataModule.getByID(todoID);
  const container = document.createElement("div");
  const checkbox = document.createElement("input");
  const name = document.createElement("p");
  const dueDate = document.createElement("span");
  const description = document.createElement("p");
  const isDueDateSet = (todoObject) => todoObject.dueDate !== undefined;
  const isDescriptionSet = (todoObject) => todoObject.description !== undefined;

  container.classList.add("todo");
  container.addEventListener("click", () =>
    userSession.setActiveTodoId(todoID)
  );

  checkbox.setAttribute("type", "checkbox");
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
    //format the date
    //update the text content
  }

  description.classList.add("details");
  if (isDescriptionSet) {
    const descriptionHTML = document.createElement("div");
    descriptionHTML.innerHTML = todoObject.description;
    const descriptionText = descriptionHTML.textContent;
    description.textContent = descriptionText;
  }
  const descriptionLength = description.textContent.length;

  container.appendChild(checkbox);
  container.appendChild(name);
  container.appendChild(dueDate);
  if (descriptionLength > 0) container.appendChild(description);

  return container;
};

export default generateTodoHTML;
