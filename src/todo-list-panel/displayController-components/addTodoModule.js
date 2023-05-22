import todoDataModule from "../../data/todoDataModule";
import activeProjectName from "./projectName";

const addTodoModule = (() => {
  const container = document.querySelector(".add-todo");
  const form = document.createElement("form");
  const input = document.createElement("input");

  input.setAttribute("type", "text");
  input.setAttribute("id", "todo");
  input.setAttribute("minlength", "1");
  input.required = true;
  updateInputProjectName();

  form.addEventListener("submit", (event) => {
    todoDataModule.todo.add(input.value);
  });

  form.appendChild(input);
  container.appendChild(form);

  function updateInputProjectName() {
    const projectName = activeProjectName.get();
    input.setAttribute("placeholder", `+ Add task to "${projectName}". Press enter to save.`);
  }

  return { update: updateInputProjectName };
})();

export default addTodoModule;
