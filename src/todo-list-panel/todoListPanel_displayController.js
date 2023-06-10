import { format } from "date-fns";
import activeProjectName from "./displayController-components/projectName";
import addTodoModule from "./displayController-components/addTodoModule";
import listModule from "./displayController-components/listModule";
import "./todoListPanel_style.scss";
import "./checkbox.scss";

import { userSession } from "../data/userSession";

const todoListPanel_displayController = (() => {
  function render() {
    activeProjectName.update();
    addTodoModule.update();
    listModule.update();
  }

  return { render };
})();

export default todoListPanel_displayController;
