import { getInboxFolder } from "./dataAccessor";

// Temporarily set root folder to Inbox for testing
// let activeFolder = getProjects().children[1];
// When you press enter, add todo to active list
const todoInput = document.body.querySelector("input#todo");
todoInput.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    let todoContent = todoInput.value;
    const newTodo = new Todo(todoContent);
    activeFolder.addChild(newTodo);
    updateListPanel(getProjects());
    todoInput.value = "";
    updateTodoPanel(activeFolder);
  }
});

const todoPanel = (() => {
  const activeFolder = () => {
    let _activeFolder = getInboxFolder(); //initialize to inbox at start;
    const set = (folder) => {
      _activeFolder = folder;
    };
    const get = () => {
      return _activeFolder;
    };
  };

  const addNewTodo = (title, dueDate) => {
    const myNewTodo = new Todo(title);
    myNewTodo.dueDate = dueDate;
    activeFolder.get().addChild(myNewTodo);
  };

  const todoList = () => {
    const get = () => {
      const myFolder = activeFolder.get();
      const todos = myFolder.getTodos();
    };
  };
})();
