import PubSub from "pubsub-js";
import todoDataModule from "../../data/todoDataModule";
import getActiveTodoObject from "../../data/todo/getActiveTodoObject";

function generateCheckbox() {
  const checkbox = document.createElement("input");

  checkbox.setAttribute("type", "checkbox");
  checkbox.id = "detail-panel-checkbox";

  checkbox.checked = getActiveTodoObject().checked;

  checkbox.addEventListener("input", () => {
    const myTodoObject = getActiveTodoObject();
    const newCheckboxStatus = checkbox.checked;
    myTodoObject.checked = newCheckboxStatus;
    todoDataModule.todo.update(myTodoObject);
    PubSub.publish("detail_changed");
  });

  return checkbox;
}

export default generateCheckbox;
