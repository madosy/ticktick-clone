import { format, isDate } from "date-fns";
import PubSub from "pubsub-js";
import todoDataModule from "../../data/todoDataModule";
import getActiveTodoObject from "../../data/todo/getActiveTodoObject";

function generateDatePicker() {
  const wrapper = document.createElement("span");
  const dateInput = document.createElement("input");
  const rawDueDate = getActiveTodoObject().dueDate;

  wrapper.classList.add("date");
  dateInput.setAttribute("type", "date");
  dateInput.setAttribute("onfocus", "this.showPicker()");

  if (rawDueDate !== null) {
    const parsedDueDate = new Date(rawDueDate);
    dateInput.setAttribute("value", format(parsedDueDate, "yyyy-MM-dd"));
  }

  dateInput.addEventListener("input", () => {
    const myTodoObject = getActiveTodoObject();
    const newDueDate = new Date(`${dateInput.value}T00:00`);
    myTodoObject.dueDate = newDueDate;
    todoDataModule.todo.update(myTodoObject);
    PubSub.publish("detail_changed");
  });

  wrapper.appendChild(dateInput);
  return wrapper;
}

export default generateDatePicker;
