// import todoListModule from "../../todo-list-panel/todoModule";
import PubSub from "pubsub-js";

function updateTodo(todoObject) {
  const todoID = todoObject.id;
  localStorage.setItem(todoID, JSON.stringify(todoObject));
}

export default updateTodo;
