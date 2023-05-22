import PubSub from "pubsub-js";
import todoDataModule from "../../data/todoDataModule";

function generateCheckbox(todoObject) {
  const checkbox = document.createElement("input");

  checkbox.setAttribute("type", "checkbox");
  checkbox.id = "detail-panel-checkbox";

  checkbox.checked = todoObject.checked;

  checkbox.addEventListener("input", () => {
    const newCheckboxStatus = checkbox.checked;
    todoObject.checked = newCheckboxStatus;
    todoDataModule.todo.update(todoObject);
    PubSub.publish("detail_changed");
  });

  return checkbox;
}

export default generateCheckbox;
