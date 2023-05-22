import PubSub from "pubsub-js";
import todoDataModule from "../../data/todoDataModule";

function generateTodoNameField(todoObject) {
  const todoNameField = document.createElement("div");
  const myTodoName = todoObject.name;

  todoNameField.contentEditable = true;
  todoNameField.classList.add("todo-title");
  todoNameField.innerText = myTodoName;

  todoNameField.addEventListener("input", () => {
    const newName = todoNameField.innerText;
    todoObject.name = newName;
    todoDataModule.todo.update(todoObject);
    PubSub.publish("detail_changed");
  });

  return todoNameField;
}

export default generateTodoNameField;
