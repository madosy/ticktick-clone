import PubSub from "pubsub-js";
import todoDataModule from "../../data/todoDataModule";
import getActiveTodoObject from "../../data/todo/getActiveTodoObject";

function generateTodoNameField(todoObject) {
  const todoNameField = document.createElement("div");
  const myTodoName = todoObject.name;

  todoNameField.contentEditable = true;
  todoNameField.classList.add("todo-title");
  todoNameField.innerText = myTodoName;

  todoNameField.addEventListener("input", () => {
    const newName = todoNameField.innerText;
    const myTodoObject = getActiveTodoObject();
    myTodoObject.name = newName;
    todoDataModule.todo.update(myTodoObject);
    PubSub.publish("detail_changed");
  });

  return todoNameField;
}

export default generateTodoNameField;
