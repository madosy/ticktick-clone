import PubSub from "pubsub-js";
import todoDataModule from "../../data/todoDataModule";
import getActiveTodoObject from "../../data/todo/getActiveTodoObject";

function generateTodoDescriptionField() {
  const descriptionField = document.createElement("div");
  const myTodoDescriptionHTML = getActiveTodoObject().description;
  const isDefined = (text) => text !== undefined;

  descriptionField.contentEditable = true;
  descriptionField.classList.add("todo-desc");
  if (isDefined(myTodoDescriptionHTML)) {
    descriptionField.innerHTML = myTodoDescriptionHTML;
  }

  descriptionField.addEventListener("input", () => {
    const myTodoObject = getActiveTodoObject();
    const newDescription = descriptionField.innerHTML;
    myTodoObject.description = newDescription;
    todoDataModule.todo.update(myTodoObject);
    PubSub.publish("detail_changed");
  });

  return descriptionField;
}

export default generateTodoDescriptionField;
