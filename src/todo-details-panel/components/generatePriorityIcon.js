import PubSub from "pubsub-js";
import todoDataModule from "../../data/todoDataModule";
import getActiveTodoObject from "../../data/todo/getActiveTodoObject";

const generatePriorityIcon = (todoObject) => {
  const span = document.createElement("span");
  const myTodoPriority = getActiveTodoObject().todoPriority;
  span.dataset.priority = myTodoPriority;

  span.innerHTML = `<span class="material-symbols-outlined">flag</span>`;
  span.classList.add("priority");

  span.addEventListener("click", () => {
    const myTodoObject = getActiveTodoObject();
    const currentPriority = myTodoObject.todoPriority;
    const newPriority = getNextPriority(currentPriority);
    myTodoObject.todoPriority = newPriority;
    todoDataModule.todo.update(myTodoObject);
    span.dataset.priority = newPriority;
    PubSub.publish("detail_changed");
  });

  return span;
};

function getNextPriority(currentPriority) {
  const priorityList = ["none", "low", "medium", "high"];
  const currentPriorityIndex = priorityList.indexOf(currentPriority);
  if (currentPriorityIndex < priorityList.length - 1) {
    return priorityList[currentPriorityIndex + 1];
  }
  return priorityList[0];
}

export default generatePriorityIcon;
