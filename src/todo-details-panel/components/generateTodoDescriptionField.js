import PubSub from "pubsub-js";
import todoDataModule from "../../data/todoDataModule";

function generateTodoDescriptionField(todoObject) {
  const descriptionField = document.createElement("div");
  const myTodoDescriptionHTML = todoObject.description;
  const isDefined = (text) => text !== undefined;

  descriptionField.contentEditable = true;
  descriptionField.classList.add("todo-desc");
  if (isDefined(myTodoDescriptionHTML)) {
    descriptionField.innerHTML = myTodoDescriptionHTML;
  }

  descriptionField.addEventListener("input", () => {
    const newDescription = descriptionField.innerHTML;
    todoObject.description = newDescription;
    todoDataModule.todo.update(todoObject);
    PubSub.publish("detail_changed");
  });

  return descriptionField;
}

export default generateTodoDescriptionField;
