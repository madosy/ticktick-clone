import PubSub from "pubsub-js";
import todoDataModule from "../../data/todoDataModule";

function generatePriorityIcon(todoObject) {
  const span = document.createElement("span");
  const myTodoPriority = todoObject.priority;

  span.innerHTML = `<span class="material-symbols-outlined">flag</span>`;
  span.classList.add("priority");

  span.addEventListener("click", () => {
    const priorityList = ["none", "low", "medium", "high"];
    const newPriority = getNextPriority(myTodoPriority);
    todoObject.priority = newPriority;
    console.log(myTodoPriority);
    todoDataModule.todo.update(todoObject);
    span.classList.remove(...priorityList);
    span.classList.add(newPriority);
    PubSub.publish("detail_changed");
  });

  return span;
}

function getNextPriority(currentPriority) {
  const priorityList = ["none", "low", "medium", "high"];
  const currentPriorityIndex = priorityList.indexOf(currentPriority);
  if (currentPriorityIndex < priorityList.length - 1) {
    return priorityList[currentPriority + 1];
  }
  return priorityList[0];
}

export default generatePriorityIcon;
